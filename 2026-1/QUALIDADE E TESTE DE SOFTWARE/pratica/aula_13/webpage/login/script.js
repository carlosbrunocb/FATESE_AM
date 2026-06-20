function fazerLogin(){

    const usuario =
        document.getElementById("usuario").value;

    const senha =
        document.getElementById("senha").value;

    const mensagem =
        document.getElementById("mensagem");

    if(usuario === "admin" && senha === "123"){

        document.title =
            "Qualidade de Software";

        mensagem.style.color = "green";

        mensagem.innerHTML =
            "Login realizado com sucesso!";

    }else{

        mensagem.style.color = "red";

        mensagem.innerHTML =
            "Usuário ou senha inválidos!";
    }
}