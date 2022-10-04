interface Success<T> {
  status: 'success';
  value: T;
}

interface Failure {
  status: 'error';
}

export type Response<T> = Success<T> | Failure;
