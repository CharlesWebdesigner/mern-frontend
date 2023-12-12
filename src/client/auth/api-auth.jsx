const signin = async (user) => {
    try {
      let response = await fetch('https://test-ea75s5odj-charles-dev-projects.vercel.app/auth/signin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const signout = async () => {
    try {
      let response = await fetch('https://test-ea75s5odj-charles-dev-projects.vercel.app/auth/signout/', { method: 'GET' })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  export {
    signin,
    signout
  }