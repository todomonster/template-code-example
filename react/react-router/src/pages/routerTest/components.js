import React from "react";

export { Title,Home, About, Topics };

const Title = (props) => {
  return <h1>{props.title}</h1>;
};

const Home = () => {
  return <h2>Home</h2>;
};

const About = () => {
  return <p>About</p>;
};

const Topics = () => {
  return <p>Topics</p>;
};
