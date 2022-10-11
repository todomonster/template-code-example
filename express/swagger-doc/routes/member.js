const express = require("express");
const router = express.Router();

router.get("/new/:id", function (req, res) {
  /* 	#swagger.tags = ['Project']
      #swagger.description = '新增商品資料'    
      #swagger.parameters['id'] = {
          in: 'body',
          description: 'body資料',
          required: true,
          schema:  { $ref: '#/definitions/Product' }
      }    
      #swagger.responses[200] = {
            description: 'User successfully obtained.',
            schema: {
                name: 'Jhon Doe',
                age: 29,
                about: ''
            }
        }
   */
  return res.send({});
});

// module.exports = {memberRouter: router};
module.exports = router;

// export default router
// import  Router  from "express";
