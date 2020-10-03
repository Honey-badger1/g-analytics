
import React, {Component} from 'react';
import {connect} from 'react-redux';
import WithStoreService from '../hoc';
import {commitsLoaded, clearNewData, dataRequested} from '../../actions';
import ListItem from '../list-item';
import BarChart from '../graphics';
import Spinner from '../spinner';
import './report.css';

class ReportList extends Component {
 

        componentDidUpdate(prevProps){
        
        if (prevProps.owner !== this.props.owner || prevProps.repo !== this.props.repo) {
            const {GitService, owner, repo}=this.props;
            let svg=document.querySelector('.chart');
            if(svg){
                svg.innerHTML="";
            }
            let second=document.querySelector('.second');
            if(second){
                second.innerHTML="";
            }
         
         
            console.log(owner, repo);
            
            if(repo&&owner){
                this.props.dataRequested()
                GitService.getUser(owner,repo)
                .then(res=>res.map(item=>item.sha))
                .then(res=>res.map(item=>{
                    return GitService.getCommitInfo(owner,repo, item)}))
               .then(res=>Promise.all(res))
               .then(res=>res.map(item=>{
                  const {commit:{author:{name,email,date}}}=item;
                  const {sha}=item;
                  const {stats:{total,additionsCommon,deletionsCommon}}=item;
                  let filenameBase=item.files.filter(item=>{
                        if(item.filename!=="package-lock.json"&&!(item.filename.endsWith('.txt'))&&!(item.filename.endsWith('.csv'))){
                                   
                      return item
                                 }
                        
                    }  )
                
                 
             
                 let filename=filenameBase.map(item=>item.filename);
                 let changes=filenameBase.map(item=>item.changes);     
                 let additions=filenameBase.map(item=>item.additions);  
                let deletions=filenameBase.map(item=>item.deletions);         
                  return {sha,
                   name, date, filename, additions, changes, deletions}
               }
                   ))
                .then(res=>res.reduce((m, o) => {
                    let found = m.find(p => p.name === o.name);
                    if (found) {
                       found.changes.push(o.changes);
                       found.deletions.push(o.deletions);
                       found.additions.push(o.additions);
                        found.sha +=',' +o.sha;
                        found.date+=o.date;
                        found.filename.push(o.filename);
                        
                    } else {
                        m.push(o);
                    }
                    return m;
                }, []))
               
                .then(res=>this.props.commitsLoaded(res))
               
                
              
         
            }
            
                      }
        
        
     
    }



    



    render() {

        const{items, owner, repo, loading}=this.props;
        if (loading){
            return <Spinner/>
        }


        console.log(items)
        if(!owner||!repo){

       
            
        return (<>
        
        <h2>Stats </h2>
        </>)
        }
        let data={}

        let newAdditions=items.map(item=>item.additions.flat().reduce((acc,a)=>acc+a));
        let newDeletions=items.map(item=>item.deletions.flat().reduce((acc,a)=>acc+a))
        console.log(newAdditions)
             
             data.labels=items.map(item=>item.name);
             data.series=[];
             data.series.push({label:'additions', values:newAdditions});
             data.series.push({label:'deletions', values:newDeletions});
             console.log(data)
             
    
        ;
        let allChanges=items.map(item=>item.changes.flat().reduce((acc,a)=>acc+a));
       if(allChanges.length>0){allChanges=allChanges.reduce((sum,i)=>sum+i)} 
       console.log(allChanges)
        
        

        return (
            <>
           
           <h2>Stats</h2>
           
       
       <div className="first">
       <table className="tableStats">
        <tr>
           <th>Name</th>
           <th>Rows added</th>
           <th>Rows Deleted</th>
           <th>Commits</th>
           <th>Stack Used in Commits</th>
           </tr>
               {
            
                items.map(item=>{
                return <ListItem key={item.sha} 
                item={item} allChanges={allChanges}
                />
                
                
                })
               
                }
        </table>
        
            
         <BarChart className="commonChart" data={data} />
                      
              
              
            
       </div>
       <div className="second">

       </div>
             
           
            
           </>
           
        )
        
    }
};

const mapStateToProps=(state)=>{
    
        
    return{
        items:state.commitsReducer.commits,
        owner:state.commitsReducer.owner,
        repo:state.commitsReducer.repo,
 
        

     
        
        

       
    }
}

const mapDispatchToProps={
    commitsLoaded,
    clearNewData,
    dataRequested,
    
}

export default WithStoreService()(connect(mapStateToProps,mapDispatchToProps)(ReportList));