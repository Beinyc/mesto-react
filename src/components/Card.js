export default function Card ({ card, onClickCard}) {
      function handleCardClick(){
         onClickCard(card)
      }
    return (
                        <div className="elements__card">
                           <img alt={card.name} src={card.link} onClick={handleCardClick} className="elements__image"/>
                           <div className="elements__signature">
                              <h2 className="elements__title">{card.name}</h2>
                              <div className="elements__like-box">
                                 <button className="elements__like" type="button"></button>
                                 <p className="elements__number-like">{card.likes.length}</p>
                              </div>
                           </div>
                           <button className="elements__delete" type="button"></button>
                        </div>
    );
}