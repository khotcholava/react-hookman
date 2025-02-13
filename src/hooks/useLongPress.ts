import React from "react";

type PressEvent = TouchEvent | MouseEvent;

interface Position {
  x: number;
  y: number;
}

interface LongPressOptions {
  threshold?: number;
  onStart?: (event: PressEvent, position: Position) => void;
  onFinish?: (event: PressEvent, position: Position, duration: number) => void;
  onCancel?: (event: PressEvent, position: Position) => void;
  onMove?: (event: PressEvent, position: Position) => void;
  preventDefault?: boolean;
  moveThreshold?: number;
  disabled?: boolean;
}

interface LongPressHandlers {
  onMouseDown?: (event: React.MouseEvent) => void;
  onMouseUp?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onMouseMove?: (event: React.MouseEvent) => void;
  onTouchStart?: (event: React.TouchEvent) => void;
  onTouchEnd?: (event: React.TouchEvent) => void;
  onTouchMove?: (event: React.TouchEvent) => void;
}

const isMouseEvent = (
  event: React.MouseEvent | React.TouchEvent
): event is React.MouseEvent => {
  return "clientX" in event;
};

const getEventPosition = (
  event: React.MouseEvent | React.TouchEvent
): Position => {
  if (isMouseEvent(event)) {
    return { x: event.clientX, y: event.clientY };
  }
  const touch = event.touches[0] || event.changedTouches[0];
  return { x: touch.clientX, y: touch.clientY };
};

const calculateDistance = (p1: Position, p2: Position): number => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

export function useLongPress(
  callback: (event: PressEvent, position: Position) => void,
  options: LongPressOptions = {}
): LongPressHandlers {
  const {
    threshold = 400,
    onStart,
    onFinish,
    onCancel,
    onMove,
    preventDefault = true,
    moveThreshold = 10,
    disabled = false,
  } = options;

  const startPosition = React.useRef<Position | null>(null);
  const currentPosition = React.useRef<Position | null>(null);
  const isLongPressActive = React.useRef(false);
  const isPressed = React.useRef(false);
  const startTime = React.useRef(0);
  const timerId = React.useRef<number>(0);

  const start = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      if (preventDefault) {
        event.preventDefault();
      }

      const position = getEventPosition(event);
      startPosition.current = position;
      currentPosition.current = position;
      isPressed.current = true;
      startTime.current = Date.now();

      onStart?.(event.nativeEvent, position);

      timerId.current = window.setTimeout(() => {
        if (isPressed.current) {
          isLongPressActive.current = true;
          callback(event.nativeEvent, position);
        }
      }, threshold);
    },
    [callback, threshold, onStart, preventDefault, disabled]
  );

  const cancel = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (!isPressed.current || disabled) return;

      const position = currentPosition.current || getEventPosition(event);
      const duration = Date.now() - startTime.current;

      if (isLongPressActive.current) {
        onFinish?.(event.nativeEvent, position, duration);
      } else {
        onCancel?.(event.nativeEvent, position);
      }

      isLongPressActive.current = false;
      isPressed.current = false;
      startPosition.current = null;
      currentPosition.current = null;

      if (timerId.current) {
        window.clearTimeout(timerId.current);
      }
    },
    [onFinish, onCancel, disabled]
  );

  const move = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (!isPressed.current || disabled) return;

      const position = getEventPosition(event);
      currentPosition.current = position;

      if (startPosition.current) {
        const distance = calculateDistance(startPosition.current, position);

        if (distance > moveThreshold) {
          cancel(event);
          return;
        }
      }

      onMove?.(event.nativeEvent, position);
    },
    [disabled, onMove, moveThreshold, cancel]
  );

  return React.useMemo(
    () => ({
      onMouseDown: start,
      onMouseMove: move,
      onMouseUp: cancel,
      onMouseLeave: cancel,
      onTouchStart: start,
      onTouchMove: move,
      onTouchEnd: cancel,
    }),
    [start, move, cancel]
  );
}
