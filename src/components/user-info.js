import React from "react"
import PropTypes from "prop-types"

const UserInfo = ({ target }) => (
    <div className="user-info">
        <img src={target.imagem} alt={`Imagem de ${target.nome}`} className="user-image" />
        <h1 className="user-name">{target.nome}</h1>
        <ul className="user-summary">
            <li>
                Repositórios: <span className="user-repo">{target.qtdRepositorios}</span>
            </li>
            <li>
                Seguidores: <span className="user-followers">{target.qtdSeguidores}</span>
            </li>
            <li>
                Seguindo: <span className="user-follow">{target.qtdSeguindo}</span>
            </li>
        </ul>
    </div>
)

UserInfo.propTypes = {
    target: PropTypes.object.isRequired
}

export default UserInfo