import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ stripeToken, title, price }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setIsLoading(true);
      // Récupérer le contenu du CardElement
      const cardElement = elements.getElement(CardElement);

      // Créer un token Stripe à partir du CardElement
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "toto",
        currency: "eur",
        price: "1200",
      });
      console.log(stripeResponse);
      // Extraire le token d'identification du paiement de la réponse de Stripe
      const stripeToken = stripeResponse.token.id;
      console.log(stripeToken);
      // Faire une requête POST vers le serveur pour traiter le paiement
      const response = await axios.post(
        " https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken: stripeToken,
          title: title,
          amount: price * 100,
        }
      );
      console.log(response.data);
      setIsLoading(false);
      // Si la réponse indique que le paiement a réussi, mettre à jour l'état
      if (response.data.status === "succeeded") {
        setPaymentCompleted(true);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Formulaire de paiement</h1>
      {/* Composant CardElement de Stripe pour saisir les informations de la carte */}
      <CardElement />
      {/* Afficher le message de paiement effectué ou le bouton d'achat */}
      {paymentCompleted === true ? (
        <p>payment completed</p>
      ) : (
        <button type="submit" disabled={isLoading}>
          Acheter
        </button>
      )}
    </form>
  );
};

export default CheckoutForm;
