import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import App, { appStore } from '../App';
import { gameFlowActions } from '../store/gameFlow';
import { GameConditions, LevelTimes } from './consts';
import '../i18n';

describe('Reaction Game UI & Gameplay Tests', () => {
  let currentTime = 1000000;
  let rafQueue: FrameRequestCallback[] = [];

  const executeCallbacks = (time: number) => {
    const callbacks = [...rafQueue];
    rafQueue = [];
    for (const cb of callbacks) {
      cb(time);
    }
  };

  const advanceStep = (delta: number) => {
    currentTime += delta;
    act(() => {
      vi.advanceTimersByTime(delta);
      executeCallbacks(currentTime);
    });
  };

  const advanceTimeAndFrames = (ms: number) => {
    const step = 16;
    let elapsed = 0;
    while (elapsed < ms) {
      const delta = Math.min(step, ms - elapsed);
      elapsed += delta;
      advanceStep(delta);
    }
  };

  beforeEach(() => {
    vi.useFakeTimers();
    currentTime = 1000000;
    rafQueue = [];
    vi.spyOn(Date, 'now').mockImplementation(() => currentTime);
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      rafQueue.push(cb);
      return rafQueue.length;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {
      rafQueue = [];
    });
    appStore.dispatch(gameFlowActions.resetState());
    appStore.dispatch(gameFlowActions.gameCondition({ condition: GameConditions.Menu }));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('full game flow: menu -> language toggle -> level select -> timer -> play -> click active box -> timeout -> game over -> restart', () => {
    const { container, getByText } = render(<App />);

    // 1. Menu screen renders
    expect(getByText(/Choose Difficulty Level|Оберіть рівень складності/i)).toBeInTheDocument();
    expect(getByText('EN')).toBeInTheDocument();
    expect(getByText('UA')).toBeInTheDocument();

    // 2. Language switcher test
    fireEvent.click(getByText('UA'));
    expect(getByText('Оберіть рівень складності')).toBeInTheDocument();

    fireEvent.click(getByText('EN'));
    expect(getByText('Choose Difficulty Level')).toBeInTheDocument();

    // 3. Select Easy level (first dot)
    const dots = container.querySelectorAll('.level-dot__wrapper');
    expect(dots.length).toBe(3);
    fireEvent.click(dots[0]);

    // 4. Timer countdown screen (3 seconds)
    expect(getByText('Get Ready!')).toBeInTheDocument();

    for (let i = 0; i < 3; i++) {
      advanceTimeAndFrames(1000);
    }

    // 5. Game Screen active
    const gridContainer = container.querySelector('[size="3"]');
    expect(gridContainer).toBeInTheDocument();
    const gridItems = gridContainer!.children;
    expect(gridItems.length).toBe(9); // 3x3 for Easy

    // Click active box
    const activeBoxIndex = appStore.getState().gameFlow.currentBox || 0;
    fireEvent.click(gridItems[activeBoxIndex]);

    expect(appStore.getState().gameFlow.score).toBe(1);

    // 6. Let timeout expire on the next box (LevelTimes.Easy)
    advanceTimeAndFrames(LevelTimes.Easy);

    // 7. Game Over Screen
    expect(getByText('GAME OVER!')).toBeInTheDocument();
    expect(getByText('Average Reaction Time')).toBeInTheDocument();
    expect(getByText('Highest Score')).toBeInTheDocument();
    expect(getByText('Restart')).toBeInTheDocument();

    // 8. Restart button returns to Menu
    fireEvent.click(getByText('Restart'));
    expect(getByText('Choose Difficulty Level')).toBeInTheDocument();
  });

  const getScale = (el: HTMLElement) => {
    const match = /scaleX\(([\d.e-]+)\)/.exec(el.style.transform);
    return match ? parseFloat(match[1]) : null;
  };

  test('progress bar smoothly shrinks and accurately scales to 0 at timeout', () => {
    const { container, getByTestId } = render(<App />);

    const dots = container.querySelectorAll('.level-dot__wrapper');
    fireEvent.click(dots[0]);

    for (let i = 0; i < 3; i++) {
      advanceTimeAndFrames(1000);
    }

    const progressBar = getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();

    // Advance to 50% elapsed
    advanceTimeAndFrames(LevelTimes.Easy * 0.5);
    expect(getScale(progressBar)).toBeCloseTo(0.5, 2);

    // Advance to 90% elapsed
    advanceTimeAndFrames(LevelTimes.Easy * 0.4);
    expect(getScale(progressBar)).toBeCloseTo(0.1, 2);

    // Advance remaining 10% to hit timeout exactly
    advanceTimeAndFrames(LevelTimes.Easy * 0.1);
    expect(getScale(progressBar)).toBe(0);
  });

  test('clicking active box right before timeout (at 95% elapsed) successfully scores and resets the bar', () => {
    const { container, getByTestId } = render(<App />);

    const dots = container.querySelectorAll('.level-dot__wrapper');
    fireEvent.click(dots[0]);

    for (let i = 0; i < 3; i++) {
      advanceTimeAndFrames(1000);
    }

    const progressBar = getByTestId('progress-bar');

    advanceTimeAndFrames(LevelTimes.Easy * 0.95);
    expect(getScale(progressBar)).toBeCloseTo(0.05, 2);

    const gridContainer = container.querySelector('[size="3"]');
    const gridItems = gridContainer!.children;
    const activeBoxIndex = appStore.getState().gameFlow.currentBox || 0;
    fireEvent.click(gridItems[activeBoxIndex]);

    expect(appStore.getState().gameFlow.score).toBe(1);

    advanceTimeAndFrames(16);
    expect(getScale(progressBar)!).toBeGreaterThan(0.98);
  });

  test('misclick on inactive box immediately triggers Game Over', () => {
    const { container, getByText } = render(<App />);

    const dots = container.querySelectorAll('.level-dot__wrapper');
    fireEvent.click(dots[0]);

    for (let i = 0; i < 3; i++) {
      advanceTimeAndFrames(1000);
    }

    const gridContainer = container.querySelector('[size="3"]');
    const gridItems = gridContainer!.children;
    const activeBoxIndex = appStore.getState().gameFlow.currentBox || 0;
    const inactiveIndex = (activeBoxIndex + 1) % 9;

    fireEvent.click(gridItems[inactiveIndex]);

    expect(getByText('GAME OVER!')).toBeInTheDocument();
  });
});
