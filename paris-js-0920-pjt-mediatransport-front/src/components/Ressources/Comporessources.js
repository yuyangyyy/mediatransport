import './Comporessources.css';
import RessourceLink from './RessourceLink';
import RessourcesLogos from './RessourcesLogos';
import RessourcesFichiers from './RessourcesFichiers';
import RessourcesDivers from './RessourcesDivers';
import { Route } from 'react-router-dom';

const Ressources = () => {
  return (
    <div className="container">
      <div className="big-title">
        <h1 className="title-contact">Rubrique utilitaire MEDIATRANSPORTS</h1>
        <h2 className="second-title">
          Retrouver toutes les ressources et informations pratiques
        </h2>
      </div>

      <div className="second-container">
        <RessourceLink href="/ressources/logos" label="Logos" />
        <RessourceLink href="/ressources/fichiers" label="Fichiers" />
        <RessourceLink href="/ressources/divers" label="Divers" />
      </div>

      <Route exact path="/ressources/logos" component={RessourcesLogos} />
      <Route path="/ressources/fichiers" component={RessourcesFichiers} />
      <Route path="/ressources/divers" component={RessourcesDivers} />
    </div>
  );
};

export default Ressources;
