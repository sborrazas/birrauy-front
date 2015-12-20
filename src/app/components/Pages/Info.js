import React from "react";
import Layout from "../Base/Layout";
import Header from "../Base/Header";
import About from "../Base/About";
import Text from "../Base/Text";
import Link from "../Base/Link";
import Nav from "../Base/Nav";
import {
  DEFAULT_LOCATION,
  IMAGES_URL,
  BREWERY_TYPES,
  BREWERY_IMG_MAP
} from "../../../../config/app.js";

class Info extends React.Component {
  render () {
    return (
      <Layout.Content>
        <About>
          <About.Title>Info</About.Title>
          <About.Description>
            <Text strong={true}>¿Dónde Pinta?</Text>
            es un mapa interactivo que muestra la ubicación de bares, tiendas
            y productores de cerveza artesanal de todo Uruguay. Ofrece
            información actualizada de los locales (extraída de
            {" "}<Link to="http://foursquare.com">Foursquare</Link>), marcas y
            estilos de cervezas artesanales nacionales, así como de eventos y
            novedades vinculadas a la temática.
          </About.Description>
          <About.Title>A quién va dirigido</About.Title>
          <About.Description>
            Es una iniciativa que busca apoyar y dar difusión al movimiento de
            cerveceros artesanales de nuestro país y -obviamente- al público
            que la disfruta. En primer lugar para los uruguayos y también
            pensando en los turistas regionales o internacionales, que buscan
            conocer productos locales de calidad.
          </About.Description>
          <About.Title>¿Cómo colaborar?</About.Title>
          <About.Description>
            Si ves que falta información, envianos un correo a
            {" "}<Link to="mailto:contacto@datauy.org">contacto@datauy.org</Link>.
          </About.Description>
          <About.Title>Equipo</About.Title>
          <About.Description>
            Este proyecto nace de una propuesta de
            {" "}<Link to="http://datauy.org">DATA</Link>,
            {" "}<Link to="http://miramama.com.uy">Mirá Mamá</Link> y
            {" "}<Link to="http://ubc.com.uy">Underground Beer Club</Link>,
            que invitaron a la comunidad a desarrollar esta idea a través de
            un primer encuentro en un Café de DATA (reuniones mensuales para
            trabajar en Datos Abiertos y herramientas sociales realizadas en
            <Link to="https://www.twitter.com/coworkinguy">CoworkingUY</Link>).
          </About.Description>
          <About.Title secondary={true}>Desarrollo</About.Title>
          <About.List>
            <About.ListItem>Danilo Espino</About.ListItem>
            <About.ListItem>Agustín Díaz</About.ListItem>
            <About.ListItem>Gustavo Villa</About.ListItem>
            <About.ListItem>Juan Pablo Blanco </About.ListItem>
            <About.ListItem>Gustavo Sánchez</About.ListItem>
            <About.ListItem>Fernando Briano</About.ListItem>
            <About.ListItem>Luis Vidal</About.ListItem>
            <About.ListItem>Emilio Cristalli</About.ListItem>
          </About.List>
          <About.Title secondary={true}>Diseño y comunicación</About.Title>
          <About.List>
            <About.ListItem>Agustín Kryger</About.ListItem>
            <About.ListItem>Carolina Curbelo</About.ListItem>
            <About.ListItem>Daniel Carranza</About.ListItem>
          </About.List>
          <About.Title secondary={true}>Datos e investigación</About.Title>
          <About.List>
            <About.ListItem>Mariano Mazzolla</About.ListItem>
            <About.ListItem>Román Sugo</About.ListItem>
            <About.ListItem>Eliana Álvarez</About.ListItem>
            <About.ListItem>Víctor Koleszar</About.ListItem>
          </About.List>
          <About.Title secondary={true}>Logística</About.Title>
          <About.List>
            <About.ListItem>Victoria Esteves</About.ListItem>
          </About.List>
          <About.Title>Datos abiertos que usa la aplicación</About.Title>
          <About.Description>
            Los datos utilizados en esta aplicación fueron recopilados por
            {" "}<Link to="http://ubc.com.uy">Underground Beer Club</Link>,
            {" "}<Link to="http://datauy.org">DATA</Link> y
            {" "}<Link to="http://uycheck.com">UYCheck</Link>
            en base a información propia y fuentes de la web. Se encuentran
            disponibles para su reutilización a través del Catálogo Nacional
            de Datos Abiertos de AGESIC, como datos abiertos, en formatos
            abiertos.
          </About.Description>
          <About.Description>
            <Text strong={true}>SUBIR Y PONER ENLACE A LOS DATOS</Text>
          </About.Description>
          <About.Title>¿Qué son Datos Abiertos?</About.Title>
          <About.Description>
            Los organismos estatales del sector público, empresas y otras
            organizaciones recogen, producen, reproducen y difunden datos.
            Incorporar la publicación de datos públicos en formatos abiertos
            abre la puerta a la posibilidad de que los mismos sean
            reutilizados en nuevos proyectos, que puedan combinarse con otras
            fuentes de datos y generar nuevas aplicaciones desarrolladas por
            el gobierno, por la sociedad civil, organizaciones, empresas o
            ciudadanos y ciudadanas en general.
          </About.Description>
        </About>
      </Layout.Content>
    );
  }
}

export default Info;
