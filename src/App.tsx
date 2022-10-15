import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import styles from "./App.module.css"


const DirectorSection = () => {
  return (
    <section id={styles.popular_directors} >
      <h2 className={styles.section_heading} >
        Popular directors
      </h2>
      <div className="carousel_wrap">
        <div className="carousel_mask" style={{width: "950px"}}>

        </div>

      </div>
      </section>
  )
}

function App() {
  return (
    <div className="App">
        <div className={styles.site_body}/>
          <div className={styles.content_wrap}>
            <DirectorSection/>
            
          </div>
        <div/>
    </div>

  );
}

export default App;
