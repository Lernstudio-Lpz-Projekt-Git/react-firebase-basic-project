import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./services/firebase-config";
import  Home  from "./components/Home/Home";
import { collection, getDocs, doc, getDoc, Firestore } from "firebase/firestore";
//import { async } from "@firebase/util";

// { title:'0', sub-title:'0',start-date:'0','end-date':'0','montag':'0', 'dienstag':'0','mittwoch':'0','donnerstag': '0', 'freitag':'0', 'samstag':'0', 'sonnatg':'0' }
function App() {
  const [getWeekById, setWeekById] = useState([]);
  const [getWeeks, setWeeks] = useState([]);
  const weeksCollectionRef = collection(db, "week-days");

  const getWeekByIdFunc  = async (ID:any) => {
    console.log(ID);
    if (ID != 0) {
      const docRef = doc(db, "week-days", ID);
      const weekIDRef = await getDoc(docRef);
      //console.log("Document data:", weekIDRef.data());
      setWeekById(() => weekIDRef.data());
    } else {
      setWeekById(() => {
        {};
      });
    }
  };

  const getDataByMenuChange = (e:any) => {
    const ID = e.target.value;
    getWeekByIdFunc(ID);
  };

  useEffect(() => {
    const getWeeks = async () => {
      const weeksData = await getDocs(weeksCollectionRef);
      setWeeks(
        weeksData.docs.map((weeks) => {
          return { ...weeks.data(), id: weeks.id };
        })
      );
    };

    getWeeks();
  }, []);

  return (
    <div className="App" key='APP'>
      <header className="App-header">
        <h2>React+Firebase-Basic Project</h2>
      </header>
      <div className="selectMenu">
        <select
          className="selectBox classic"
          id="selectBoxId"
          name="weeksMenu"
          onChange={getDataByMenuChange}
        >
          <option key="optioan_list_key" value="0">Woche auswählen ...</option>
          {getWeeks.map((weekDate) => {
            return (
              <option value={weekDate['id']} key={weekDate['id']}>
                Speiseplan vom {weekDate["start-date"]} {"-"}{" "}
                {weekDate["end-date"]}
              </option>
            );
          })}
        </select>
      </div>
      <div className="weeks" key="WEEKS">
        {Array(getWeekById).map((week, i) => {
          if (week === undefined || week.length === 0) {
            return <div key={i}>Bitte eine Woche auswählen.</div>;
          } else {
            console.log(week);
            return (
              <div className="main" key="MAIN">
                <div className="ausgabe">
                  <h2 className="ausg-title">{week["title"]}</h2>
                  <h3 className="ausg-subt">
                    {week["sub-title"]} {week["start-date"]} - {week["end-date"]}
                  </h3>
                </div>
                <div className="menu">
                  <div className="menu-ausg">
                    <div className="menu-title">Montag</div>
                    <div className="menu-content" key={i}>
                      <h4>{week["montag"][0]}</h4>
                      <i>{week["montag"][1]}</i>
                    </div>
                    <p className="menu-img">
                      {week["montag"][2] ? (
                        <img
                          src="../src/assets/images/vegan.png"
                          alt="Vegatarisch"
                        />
                      ) : (
                        <img
                          src="../src/assets/images/not-vegan.png"
                          alt="Vegatarisch"
                        />
                      )}
                    </p>
                  </div>
                  <div className="menu-ausg">
                  <div className="menu-title">Dienstag</div>
                  <div className="menu-content" key={i}>
                    <h4>{week["dienstag"][0]}</h4>
                    <i>{week["dienstag"][1]}</i>
                    </div>
                    <p className="menu-img">
                      {week["dienstag"][2] ? (
                        <img
                          src="../src/assets/images/vegan.png"
                          alt="Vegatarisch"
                        />
                      ) : (
                        <img
                          src="../src/assets/images/not-vegan.png"
                          alt="Vegatarisch"
                        />
                      )}
                    </p>
                  </div>
                  <div className="menu-ausg">
                  <div className="menu-title">Mittwoch</div>
                  <div className="menu-content" key={i}>
                    <h4>{week["mittwoch"][0]}</h4>
                    <i>{week["mittwoch"][1]}</i>
                    </div>
                    <p className="menu-img">
                      {week["mittwoch"][2] ? (
                        <img
                          src="../src/assets/images/vegan.png"
                          alt="Vegatarisch"
                        />
                      ) : (
                        <img
                          src="../src/assets/images/not-vegan.png"
                          alt="Vegatarisch"
                        />
                      )}
                    </p>
                  </div>
                  <div className="menu-ausg">
                  <div className="menu-title">Donnerstag</div>
                  <div className="menu-content" key={i}>
                    <h4>{week["donnerstag"][0]}</h4>
                    <i>{week["donnerstag"][1]}</i>
                    </div>
                    <p className="menu-img">
                      {week["donnerstag"][2] ? (
                        <img
                          src="../src/assets/images/vegan.png"
                          alt="Vegatarisch"
                        />
                      ) : (
                        <img
                          src="../src/assets/images/not-vegan.png"
                          alt="Vegatarisch"
                        />
                      )}
                    </p>
                  </div>
                  <div className="menu-ausg">
                    <div className="menu-title">Freitag</div>
                    <div className="menu-content" key={i}>
                      <h4>{week["freitag"][0]}</h4> 
                      <i>{week["freitag"][1]}</i>
                      </div>
                      <p className="menu-img">
                        {week["freitag"][2] ? (
                          <img
                            src="../src/assets/images/vegan.png"
                            alt="Vegatarisch"
                          />
                        ) : (
                          <img
                            src="../src/assets/images/not-vegan.png"
                            alt="Vegatarisch"
                          />
                        )}
                      </p>
                    </div>
                  <div className="menu-ausg">
                  <div className="menu-title">Samstag</div>
                  <div className="menu-content" key={i}>
                    <h4>{week["samstag"][0]}</h4> 
                    <i>{week["samstag"][1]}</i>
                    </div>
                    <p className="menu-img">
                      {week["samstag"][2] ? (
                        <img
                          src="../src/assets/images/vegan.png"
                          alt="Vegatarisch"
                        />
                      ) : (
                        <img
                          src="../src/assets/images/not-vegan.png"
                          alt="Vegatarisch"
                        />
                      )}
                    </p>
                  </div>
                  <div className="menu-ausg">
                  <div className="menu-title">Sonntag</div>
                  <div className="menu-content" key={i}>
                    <h4>{week["sonnatg"][0]}</h4> 
                    <i>{week["sonnatg"][1]}</i>
                    </div>
                    <p className="menu-img">
                      {week["sonnatg"][2] ? (
                        <img
                          src="../src/assets/images/vegan.png"
                          alt="Vegatarisch"
                        />
                      ) : (
                        <img
                          src="../src/assets/images/not-vegan.png"
                          alt="Vegatarisch"
                        />
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;
