const getLastPath = () => {
    return window.location.pathname.split("/").pop()
}

export default getLastPath
