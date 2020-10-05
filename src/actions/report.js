  
const commitsLoaded=(commits)=>{
    return{
        type:"COMMITS_LOADED",
        payload:commits
    };
};

const formValues=({owner,repo})=>{
    return{
        type:"FORM_VALUES",
        payload:{owner,repo}
        
    };
};

const dataRequested=()=>{
    return{
        type:"DATA_REQUESTED"
        
    };

};
const showContent=()=>{
    return{
        type:"SHOW_CONTENT"
        
    };

};








export {
    commitsLoaded,
    formValues,
    dataRequested,
    showContent


    
   
};