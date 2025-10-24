export function isNodeError<T extends string = string>(
  error: unknown,
  code?: T,
): error is NodeJS.ErrnoException & { code: T } {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  // 코드 프로퍼티 체크
  const maybeError = error as Partial<NodeJS.ErrnoException>;
  if (typeof maybeError.code !== 'string') return false;

  // Node 시스템 에러 특징 속성들 중 하나 이상 존재 확인
  const hasNodeTraits =
    typeof maybeError.errno === 'number' ||
    typeof maybeError.syscall === 'string' ||
    typeof maybeError.path === 'string';

  if (!hasNodeTraits) return false;

  // 코드 일치 검사
  return code ? maybeError.code === code : true;
}
