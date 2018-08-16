import React from "react"
import PropTypes from "prop-types"

const Search = ({ placeholder, handleSearch, enabled }) => (
    <div className="search">
        <input
            type="search"
            placeholder={placeholder}
            onKeyUp={handleSearch} 
            disabled={enabled}/>
    </div>
)

Search.propTypes = {
    placeholder: PropTypes.string, 
    handleSearch: PropTypes.func, 
    enabled: PropTypes.bool
}

export default Search