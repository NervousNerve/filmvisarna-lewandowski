const Register = () => {
  return (
    <div>
      <h1>Sign up</h1>
      <p>You have to log in to book tickets.</p>
      <form>
        <input placeholder="Name" type="email" />
        <input placeholder="Email" type="text" />
        <input placeholder="Password" type="text" />
        <button>Create account</button>
      </form>
    </div>
  );
};

export default Register;
