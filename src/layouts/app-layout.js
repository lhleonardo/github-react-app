import React from "react"
import PropTypes from "prop-types"

import Search from "../components/search"
import UserInfo from "../components/user-info"
import ListagemRepositorios from "../components/listagem-repositorio"

const AppLayout = ({ userInfo, repositorios, favoritos, handleSearch, carregandoDados, naoEncontrado }) => {
    return (
        <div className="app">
            <Search placeholder="Digite o nome do usuário do GitHub" handleSearch={handleSearch} enabled={carregandoDados}/>

            {!!carregandoDados && <h2>Carregando, aguarde...</h2>}

            {!!naoEncontrado && <h2>Usuário não foi encontrado!</h2>}

            {!!userInfo && <UserInfo target={userInfo}/>}

            {!!repositorios.length &&
                <ListagemRepositorios className="repo-list" title="Lista de Repositórios:" items={repositorios} />}

            {!!favoritos.length &&
                <ListagemRepositorios className="fav-list" title="Lista de Favoritos" items={favoritos} />}
        </div>
    );
}

AppLayout.propTypes = {
    userInfo: PropTypes.object,
    repositorios: PropTypes.array.isRequired,
    favoritos: PropTypes.array.isRequired
}

export default AppLayout

