const environment = process.env;

export default function () {
  return {
    test: {
      baseUrl: `${environment.REACT_APP_API}`,
    },
  };
}
