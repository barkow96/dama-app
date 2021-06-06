const Contact = ({contact, handleChange, filterWord, checkValue}) => {
    const img = contact.avatar;
    const chkBxId = `chkBx${contact.id}`;

    const checkFilter = (filter) => {
        const firstName = contact.first_name.toLowerCase();
        const lastName = contact.last_name.toLowerCase();
        const flt = filter.toLowerCase();
        const words = flt.split(" ");

        if (words.length === 1) {
            if (firstName.includes(words[0]) || lastName.includes(words[0])) return true;
            else if (words[0] === "") return true;
            else return false;
        }
        else if (words.length === 2) {
            if ((words[0] === firstName && lastName.startsWith(words[1])) || 
                (words[0] === lastName && firstName.startsWith(words[1]))) return true;
            else return false;
        }
        else return false;
    };

    const show = checkFilter(filterWord);

    return (
       <div>
            <li className="contact" style={show ? {} : {display: "none"}}>
                <div className="contact-element" onClick={(event) => handleChange(event,contact.id)}>
                    {img != null ? <img src={contact.avatar} alt="new"/> : <div className="blank">NO PICTURE</div>}
                </div>
                <div className="contact-element" onClick={(event) => handleChange(event,contact.id)}>| {contact.first_name}</div>
                <div className="contact-element" onClick={(event) => handleChange(event,contact.id)}>| {contact.last_name}</div>
                <div className="contact-element">|<input type="checkbox" onClick={(event) => handleChange(event,contact.id)} value={checkValue} id={chkBxId}/></div>
            </li>
        </div>
    );
};

export default Contact;