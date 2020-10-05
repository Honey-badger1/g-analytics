const initialState = {
    commits: [],
    owner:"",
    repo:"",
    loading:true,
    show:"false"
   
 
    

}

const commitsReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'COMMITS_LOADED':

            return {
                ...state,
                commits: action.payload,
                loading: false



            };
            case 'FORM_VALUES':

                return {
                    ...state,
                    owner: action.payload.owner,
                    repo: action.payload.repo
    
    
    
                };
                case 'CLEAR_DATA':

                    return {
                        ...state,
                        commits:[],
                        owner:"",
                        repo:""
        
        
        
                    };
                    case 'DATA_REQUSTED':
                        return {
                            ...state,
                            commits: state.commits,
                                loading: true
                               
                        };
                        case 'SHOW_CONT':
                            return {
                                ...state,
                               
                                show:true
                                   
                            };
    



   
              
         

            default:
            return state;
    }
}





export default commitsReducer  ;