import {marked}  from 'marked'; 
import axios from "axios" 
export async function getHtml (articleType:any){
   return await axios.get(`/md/${articleType.fileName}`).then(res =>{
      if(res.data){
         return marked(res.data);
      }
   })
};
