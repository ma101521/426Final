//This will be where we retrieve the username and password and either store it or authenticate it 


$(function() {
    //test loading
    /* $('.signupButton').click(logSignUp);

    function logSignUp(event){
        event.preventDefault();
        console.log("hi");
        console.log(event.currentTarget);
        console.log($('#email').val());
        console.log($('#password').val());
    } */

    $('.signupButton').on('click', test);


  function test(event){
    event.preventDefault();
    console.log('hi');
    const pubRoot = new axios.create({
      baseURL: "http://localhost:3000/public"
    });

    async function createAuthor({first = 'John', last = 'Doe', numBooks = 0}) {
      return await pubRoot.post(`/authors/`, {
        data: {first, last, numBooks}
      })
    }

    async function getAllAuthors() {
      return await pubRoot.get('/authors');
    }

    (async () => {
      await createAuthor({
        first: "chris",
        numBooks: 4
      });

      let {data} = await getAllAuthors();
      console.log(data)
    })();

  }
});