import React,{Component} from 'react'
import {Text,View,FlatList,TouchableOpacity,StyleSheet,Alert,Image,Linking,TextInput,Dimensions} from 'react-native'

import axios from 'axios'



const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: 'bearer 82cab81619fcccb82029e905ff2a65a1c424972f',
  },
});
const GET_ISSUES_OF_REPOSITORY = `
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
      repository(name: "the-road-to-learn-react") {
        name
        url
        issues(last: 5) {
          edges {
            node {
              id
              title
              url
            }
          }
        }
      }
    }
  }
`;
const id = "the-road-to-learn-react";
const Organization = ({ organization,errors }) => {
  if (errors) {
    return (
      <View>
        <Text>Something went wrong:</Text>
        {errors.map(error => error.message).join(' ')}
      </View>
    );
  }
  return (

      <View>
        
          <Text>Issues from Organization:</Text>
          
          <Text style={{color: 'blue'}}
              onPress={() => Linking.openURL(organization.url)}>
              {organization.name}
          </Text>
          <Repository repository={organization.repository} />
      </View>
    );
  }
  const Repository = ({ repository }) => {
    return(
    <View>
      
        <Text>In Repository:</Text>
       
        <Text style={{color: 'blue'}}
              onPress={() => Linking.openURL(repository.url)}>
              {repository.name}
        </Text>
        <Text>
       {console.log(repository.issues)}
       {
         repository.issues.edges(issue=>(
           console.log(issue)
         ))
       }
      
       <Text>
      {/*repository.issues.edges.map(issue => (
        <Text key={issue.node.id}>
           <Text style={{color: 'blue'}}
              onPress={() => Linking.openURL(issue.node.title)}>
              {issue.node.title}
        </Text>
         
        </Text>
      ))*/}
    </Text>
    </Text>
    </View>
    )
  }
export default class App extends Component {

  constructor(props){
    super(props)
      this.state={
        GET_REPOSITORY_OF_ORGANIZATION:`
        {
          organization(login: "the-road-to-learn-react") {
            name
            url
            repository(name: "the-road-to-learn-react") {
              name
              url
            }
          }
        }
      `,
        interests:[
        {id: '0',interestName:"interest One",checked:true},
        {id: '1',interestName:"interest Two",checked:true},
        {id: '2',interestName:"interest Three",checked:true},
        {id: '3',interestName:"interest Four",checked:true},
        {id: '4',interestName:"interest Five",checked:true},
        {id: '5',interestName:"interest Six",checked:true},
        {id: '6',interestName:"interest Seven",checked:true},
        ],
        checked:false,
        markers: [],
        path:'the-road-to-learn-react/the-road-to-learn-react',
        organization: null,
        errors: null,
      }
        
 
    
  }
 

  

  
 

  componentDidMount(){
   
    this.graphQLGitHub();
    console.log(this.state.org)
    this.graphQLGitHubIssues()
  }
 
graphQLGitHub = () => {
  axiosGitHubGraphQL
    .post('', { query: this.state.GET_REPOSITORY_OF_ORGANIZATION })
    .then(result =>
      this.setState(() => ({
        organization: result.data.data.organization,
        errors: result.data.errors,
      })),
    );
    console.log(this.state.GET_REPOSITORY_OF_ORGANIZATION)
}

graphQLGitHubIssues = () => {
  axiosGitHubGraphQL
    .post('', { query: GET_ISSUES_OF_REPOSITORY })
    .then(result =>
      this.setState(() => ({
        organization: result.data.data.organization,
        errors: result.data.errors,
      })),
    );
    
}


  render(){
    const { path, organization, errors } = this.state;
    return(
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text>
          Hello
        </Text>

        
      {organization ? (
          <Organization organization={organization} errors={errors} />
        ) : (
          <Text>No information yet ...</Text>
        )}
       <TextInput
        id="url"
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(path) => {
            this.setState({path})
            this.setState({GET_REPOSITORY_OF_ORGANIZATION:`
            {
              organization(login: ${this.state.path}) {
                name
                url
                repository(name: "the-road-to-learn-react") {
                  name
                  url
                }
              }
            }
          `})
         
          }
      }
        value={this.state.path}
      />
     
      
      <TouchableOpacity
                     
            onPress={()=>this.graphQLGitHub()}         
          
      >
          
        <Text>graphQL search</Text>
      </TouchableOpacity> 
         
        
        
      </View>
    )
  }

}

const styles = StyleSheet.create({
  cardStyles:{
    width:screenWidth*0.8,
    height:screenHeight*0.3,
    backgroundColor:'white',
    margin:30,
    borderRadius:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    
  }
})
