
 const mongoose = require('mongoose');

 const schema = new mongoose.Schema(
   {
     name: { type: String, required: true }, // name without extension
     url: { type: String, required: true }, //at first, this used as path, but from files v2, this used as url to download the file directly
     path: { type: String, required: false }, // when downloading files, this should be checked first, else we use url
     encoding: { type: String, required: false },
     originalname: { type: String, required: false }, // name + . + extension
     extension: { type: String, required: false }, // the extension prefixed with a dot
     tag: { type: String, required: false }, // a string to identify the source or where the file is displayed in front (source)
     
     linkedData: [
       {
         kind: String, //name of the associated collection, schema name
         kindId: {
           type: mongoose.Schema.Types.ObjectId,
           refPath: 'linkedData.kind',
         },
         kindTag:{
           type:String,
           enum:['crm_timeline_file_not_linked_to_note']
         }
       },
     ], //if the file is associated to another model , kind refers to a collection. makes it so easy to share the same file between multiple collection
     byUser: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'uses',
     },
     mimetype: String,
     size: Number, // in bytes, 1 million ~ 1 mb

     authorize: {
        public: {
          type: String,
          required: true,
          enum: ['registered', 'all', 'not_public'],
          default: 'not_public',
        },
        userIds: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
          },
        ],
        enterprisesIds: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'enterprises',
            required: false,
          },
        ],
      }, 
   },
   { timestamps: true },
 );
 

 mongoose.model('files', schema);
 