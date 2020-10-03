import React from 'react';
import BarChartDetailed from '../graphics-detailed';
import './list-item.css';


const ListItem = ({item, allChanges}) => {
    
   const {sha, date, deletions, name, additions, filename, changes}=item;
   const shaSplitted=sha.split(',').length;
   let filenames=filename.flat();
   let change=changes.flat();
   let added=additions.flat();
   let deleted=deletions.flat();
   let combined= filenames.map(function(v,i) {
    return [v, change[i], added[i], deleted[i]];
});



   let a=['JavaScript','Python','SQL', 'CSS', 'HTML', 'JAVA', 'PHP','.NET','SQL','RUBY','C++']

   function findFiles(arr){
       switch (true){
           case arr[0].endsWith('.js'):
               arr[0]='JAVASCRIPT';
               break;
            case arr[0].endsWith('.css'):
                arr[0]='CSS';
                break;
            case arr[0].endsWith('.html'):
                arr[0]='HTML';
                break;
            case arr[0].endsWith('.java'):
                arr[0]='JAVA';
                break;
            case arr[0].endsWith('.py'):
                arr[0]='PYTHON';
                break;
            case arr[0].endsWith('.php'):
                arr[0]='PHP';
                break;
            case arr[0].endsWith('.sql'):
                arr[0]='SQL';
                break;
            case arr[0].endsWith('.ruby'):
                arr[0]='RUBY';
                break;
            case arr[0].endsWith('.net'):
                arr[0]='.NET';
                break;
            case arr[0].endsWith('.c'):
                arr[0]='C++';
                break;
            case arr[0].endsWith('lock.json'):
                    arr[0]='LOCK';
                    break;
            case arr[0].endsWith('.json'):
                    arr[0]='JSON';
                    break;
            case arr[0].endsWith('.sass'):
                arr[0]='SASS';
                break;
            case arr[0].endsWith('.bson'):
                    arr[0]='MONGO';
                    break;
            case arr[0].endsWith('.csv'):
                        arr[0]='CSV';
                        break;
            case arr[0].endsWith('.txt'):
                        arr[0]='TEXT';
                        break;
                default:
                    arr[0]='OTHER';
                    break;
       }
   }

  

   combined.map(item=>findFiles(item));
   console.log(combined)
   let comb=combined.map(([stack, val, added, deleted]) => ({stack, val, added, deleted}))
  
  
   let combb= comb.reduce((m, o) => {
    let found = m.find(p => p.stack === o.stack);
    if (found) {
        found.val += o.val;
        found.added+= o.added;
        found.deleted+=o.deleted;  
    } else {
        m.push(o);
    }
    return m;
}, []);


let totalCountChanges=combb.reduce((acc,item)=>acc+item.val,0)
let totalCountAdditions=combb.reduce((acc,item)=>acc+item.added,0);
let totalCountDeletions=combb.reduce((acc,item)=>acc+item.deleted,0)
   console.log(combb)
   console.log(totalCountChanges)
let finalStack=combb.map(({stack,val})=>{
    val=(val/totalCountChanges*100).toFixed(2);
    return {stack,val}
});

let data2=[]



     
 let    labels=([finalStack.map(item=>item.stack), name]).flat();
   
  let   series=([finalStack.map(item=>item.val),(totalCountChanges/allChanges*100).toFixed(2)]).flat();

  for(let i=0;i<labels.length;i++){
      data2[i]={label:labels[i], series:parseFloat(series[i])}


  }
    console.log(data2)

 
    
    return (
        <>
           <tr>
                <td>{name}</td>
                <td>{totalCountAdditions}</td>
                <td>{totalCountDeletions}</td>
                <td>
                  {shaSplitted

                  }</td>
                <td><ul>{finalStack.map(item=>{
                    return <li>{item.stack}:{item.val}%; </li>
                })
                    }</ul></td>

             
               
           </tr>      
          <BarChartDetailed data={data2}/>      
          
        </>
    )
}

export default ListItem;
