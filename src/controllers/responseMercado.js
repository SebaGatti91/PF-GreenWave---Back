const {Purchase} = require("../db");

const responseMercado = async (req, res) => {

  
  const {status, external_reference }= req.query

  const datos = JSON.parse(external_reference)

//   console.log(JSON.PAR(external_reference).userId)
//   console.log(external_reference.productsId)
//   console.log(external_reference.userId)

//   if (status === "approved") {
//     //   await Purchase.create({
//     //     UserId: datos.userId,
//     //     ProductId: datos.productsId,
//     //     // otras columnas de compra si es necesario
//     //   });
    
//     }

  res.redirect('https://www.elespectador.com/resizer/Y6i1y4O1HnbwKq5W7mTq81n0udU=/525x350/filters:quality(60):format(jpeg)/cloudfront-us-east-1.images.arcpublishing.com/elespectador/PT3GKS2WMRBNLHDLXQWWM63J5U.jpg')
}

module.exports = {
    responseMercado
};