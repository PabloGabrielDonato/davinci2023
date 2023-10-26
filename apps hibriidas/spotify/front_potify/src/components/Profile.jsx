import { useState } from "react";
import { useProfile, useSetProfile } from "../contexts/session.context";
import "./Profile.css";
import { toast } from "react-toastify";

function Profile() {
  const profile = useProfile();
  const setProfile = useSetProfile();
  const [inputName, setInputName] = useState(profile.name);
  const [inputEmail, setInputEmail] = useState(profile.email);
  const [inputAvatar, setInputAvatar] = useState(profile.avatar);

  function handleOnChangeFile(event) {
    const file = event.target.files[0];
    setInputAvatar(file);
  }

  function crearPerfil(event) {
    event.preventDefault();
    setProfile(inputAvatar, inputName, inputEmail);
    toast.success("Perfil creado con éxito 🏆", {theme: "dark"})
  }

  return (
    <div className="container">
      <h2 className="subtitle">Perfil de usuario</h2>
      {profile.name ? (
        <section className="card profile">
          <img
            className="profile-image"
            src={profile.avatar}
            height={50}
            width={50}
            alt="avatar"
          />
          <div>
            <p className="profile-text">Nombre: {profile.name}</p>
            <p className="profile-text">Email: {profile.email}</p>
          </div>
        </section>
      ) : (
        <form onSubmit={crearPerfil}>
            <label>Nombre</label>
          <input
            placeholder="Nombre"
            type="text"
            onChange={(e) => {
              setInputName(e.target.value);
            }}
          />
          <label>Email</label>
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => {
              setInputEmail(e.target.value);
            }}
          />
          <label>Avatar</label>
          <input
            type="file"
            onChange={handleOnChangeFile}
          />
          <button type="submit">Crear Perfil</button>
        </form>
      )}
    </div>
  );
}

export default Profile;
