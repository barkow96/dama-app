const Filter = ({changeFilter}) => {
    return (
        <div className="filter">
            <input type="text" placeholder="Search for a person" onChange={(event) => changeFilter(event)}/>
        </div>
    );
};

export default Filter;