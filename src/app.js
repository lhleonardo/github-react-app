import React, { Component } from "react"
import AppLayout from "./layouts/app-layout"
import fetch from "isomorphic-fetch"

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            userInfo: null,
            repositorios: [],
            favoritos: [],
            naoEncontrado: false,
            carregandoDados: false
        }

        this.buscaElementos.bind(this)
    }

    mapeamento(origem) {
        return origem.map(elemento => {
            let nome = "[" + elemento.name + "] "
            if (elemento.description) {
                nome += elemento.description
            } else {
                nome += elemento.name
            }
            return {
                nome: nome,
                link: elemento.html_url
            }
        })
    }

    buscaElementos(nome) {
        try {
            this.setState({
                carregandoDados: true,
                naoEncontrado: false
            }, () => {
                Promise.all([
                    fetch(`https://api.github.com/users/${nome}`),
                    fetch(`https://api.github.com/users/${nome}/repos`),
                    fetch(`https://api.github.com/users/${nome}/starred`)
                ]).then(([userInfo, repositorios, favoritos]) => {
                    return Promise.all([userInfo.json(), repositorios.json(), favoritos.json()])
                }).then(([usuario, repositorios, favoritos]) => {
                    console.log(usuario);

                    this.setState({
                        userInfo: {
                            nome: usuario.name,
                            imagem: usuario.avatar_url,
                            qtdRepositorios: usuario.public_repos,
                            qtdSeguidores: usuario.followers,
                            qtdSeguindo: usuario.following
                        },
                        repositorios: this.mapeamento(repositorios),
                        favoritos: this.mapeamento(favoritos),
                        carregandoDados: false,
                        naoEncontrado: false
                    })

                }).catch(erro => {
                    this.setState({
                        userInfo: null,
                        repositorios: [],
                        favoritos: [],
                        carregandoDados: false,
                        naoEncontrado: true
                    })
                })

            })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <AppLayout
                userInfo={this.state.userInfo}
                repositorios={this.state.repositorios}
                favoritos={this.state.favoritos}
                carregandoDados={this.state.carregandoDados}
                naoEncontrado = {this.state.naoEncontrado}
                handleSearch={(e) => {
                    const KEY_ENTER = 13

                    if (e.keyCode === KEY_ENTER) {
                        this.buscaElementos(e.target.value)
                    }
                }} />
        )
    }
}

