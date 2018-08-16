import React from "react"
import PropTypes from "prop-types"

const ListagemRepositorios = ({ className, title, items }) => (
    <div className={className}>
        <h3>{title}</h3>
        <ul>
            {items.map((el) => (
                <li key={el.link}>
                    <a href={el.link}>{el.nome}</a>
                </li>
            ))}
        </ul>
    </div>
)

ListagemRepositorios.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    items: PropTypes.array
}

export default ListagemRepositorios