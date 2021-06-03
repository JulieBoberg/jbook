import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
// import { url } from 'inspector';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache'
});


 
export const unpkgPathPlugin = (inputCode : string) => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({filter: /(^index\.js$)/}, ()=>{
        return {path: 'index.js', namespace: 'a'}
      })


      build.onResolve({ filter: /.*/ }, async (args: any) => {

if(args.path.includes('./') || args.path.includes ( '../')){
  return {
    namespace: 'a',
    path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
  }
}


return {
  namespace:'a',
  path: `https://unpkg.com/${args.path}`
}
  
      });
 
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode,
          };
        } 


        //Check to see if we have already fetched file
        //and if it is in cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path)

        //if it is, return
        if(cachedResult){
          return cachedResult
        }
        const {data, request} = await axios.get(args.path);

    
        console.log(request)
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        }
                //store response in cache
                await fileCache.setItem(args.path, result);
                return result;
      });
    },
  };
};