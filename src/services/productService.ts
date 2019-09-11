
export const getProducts = (): Promise<any> => {
  console.log('in service');
  const promise = new Promise<any>((resolve) => {
    fetch('https://apiapptrainingms.azurewebsites.net/api/Products').then(p => p.json()).then(r => {
      // console.log(`In Service Resolve ${JSON.stringify(r)}`);
      resolve(r);
    })
  }

  );
  return promise;
}