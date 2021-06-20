import Contact from './components/Contact.js';
import Filter from './components/Filter.js';
import { useState, useEffect, useRef } from 'react';

const App = () => {
  const [contactsData, setContactsData] = useState(new Array(1000));
  const [checkValues, setCheckValues] = useState(new Array(1000));
  const [dataLoaded, setDataLoaded] = useState(false);
  const [filterWord, setFilterWord] = useState("");
  const [IDsText, setIDsText] = useState("");
  const IDArray = useRef([]);
  const URL = "https://api.jsonbin.io/b/60cf2c005ed58625fd153234";

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();

      const chk = [];
      data.forEach(contact => {
        chk.push({
          id: contact.id,
          checked: false
        });
      });
      
      data.sort((a,b) => a.last_name.localeCompare(b.last_name));
      
      setContactsData(data);
      setCheckValues(chk);
      setDataLoaded(true);
    };
    
    getData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(URL);

    if (!res.ok) {
      const mess = `Something went wrong. Error status: ${res.status}`;
      throw new Error(mess);
    }

    const data = await res.json();
    return data;
  };

  const handleChange = (event, id) => {
    const chkBxId = `chkBx${id}`;
    const chkBx = document.getElementById(chkBxId);
    if (event.target.localName !== "input") chkBx.checked = !chkBx.checked;

    if (chkBx.checked && !IDArray.current.includes(id)) IDArray.current.push(id);
    else if (!chkBx.checked && IDArray.current.includes(id)) {
      const index = IDArray.current.indexOf(id);
      IDArray.current.splice(index,1);
    }

    const chk = checkValues;
    chk[id-1].checked = chkBx.checked;
    setCheckValues(chk);

    let text = "";
    for (const value of checkValues) if (value.checked) text += value.id + " ";

    setIDsText(text);
    IDArray.current.length >= 1 ? console.log(`IDs of all selected contacts: ${IDArray.current}`) : console.log("No selected contacts") ;
  };

  const changeFilter = (event) => setFilterWord(event.target.value);
    
  return (
    <div className="container">
      <header>
        <div className="title">DaMa APP</div>
        <Filter changeFilter={changeFilter}/>
        <div className="text">{IDsText.length > 1 ? `IDs of selected contacts: ${IDsText}` : "Select some contacts to reveal their IDs!"}</div>
      </header>

      {dataLoaded ? 
      <main>
        <ul className="main">
          {contactsData.map(contact => (
            <Contact contact={contact} handleChange={handleChange} filterWord={filterWord} checkValue={checkValues[contact.id-1].checked} key={contact.id}/>
          ))}
        </ul>
      </main> : ""}

      {dataLoaded ? 
      <footer>
          <div className="footer">
            <p>Bartosz Kowal - Data Management APP</p>
            <p><a href="https://github.com/barkow96" target="blank">Click to check out my GITHUB profile</a></p>
            <p><a href="https://linkedin.com/in/barkow96" target="blank">Click to check out my LINKEDIN profile</a></p>
          </div>
      </footer> : ""}  
    </div>
  );
};

export default App;