
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
 	name: String,
    address:  String,
    dateRegister: {type: Date, default: new Date()},
    accountType: {type: String, default: 'simple'},
    phoneNumber: String,
    email: {type: String, immutable: true},
    picture: {type: String, default: 'https://img.icons8.com/ios/50/000000/cat-profile.png'},
    NIF: {type: String, default: ''},
    STAT: {type: String, default: ''},
    RCS: {type: String, default: ''},
    website: String,
    status: {type: String, default: 'disabled'},
    activeLink: {
        type: Array,
        default: [
            {
              title: 'Liste des produits',
              icon: 'cube-outline',
              link: ['/pages/products'],
            },
            {
              title: 'Inventaire',
              icon: 'checkmark-square-outline',
              link: ['/pages/inventaire']
            },
            {
              title: 'Catégories des produits',
              icon: 'list-outline',
              link: ['/pages/products/categories']
            },
            {
              title: 'Entrées',
              icon: 'trending-down-outline',
              link: ['/pages/entres']
            },
            {
              title: 'Sorties',
              icon: 'trending-up-outline',
              link: ['/pages/sorties'],
            }
        ]
    },
    typeAccount: {type: Number, default: 1}
})
module.exports = mongoose.model('user', userSchema);
    