import React, { createContext, useState, useEffect } from "react";
import * as myFireStore from "../Firebase";

export const UserContext = createContext({ user: null });

function UserProvider(props) {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    let isSubscribed = true;
    myFireStore.FireAuth.onAuthStateChanged(authUser => {
      if(isSubscribed) {
        authUser ? setAuthUser(authUser) : setAuthUser(null);
      }
    });
    return () => isSubscribed = false;
  }, []);

  return (
    <UserContext.Provider value={authUser}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider;

// class UserProvider extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       authUser: null,
//     };
//   }

//   componentDidMount() {
//     console.log('in compoenent did mount');
//     this.listener = myFireStore.FireAuth.onAuthStateChanged((authUser) => {
//       authUser
//         ? this.setState({ authUser })
//         : this.setState({ authUser: null });
//     });
//   };

//   componentWillUnmount() {
//     this.listener();
//   }

//   render() {
//     return (
//       <UserContext.Provider value={this.state.user}>
//         {this.props.children}
//       </UserContext.Provider>
//     );
//   }
// }

// export default UserProvider;
