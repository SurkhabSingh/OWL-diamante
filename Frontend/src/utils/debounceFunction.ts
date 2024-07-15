function debounceFunction(fn: React.FunctionComponent, d: number) {
  let timer: string | number | NodeJS.Timeout | undefined;
  return () => {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, d);
  };
}
