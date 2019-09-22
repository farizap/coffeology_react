import createStore from 'unistore';

// import json
import Swal from 'sweetalert2';
import stepTypes from './stepTypes';

// import style

const initialState = {
  // url
  // baseURL: 'http://0.0.0.0:5000',
  statusRegister: null,
  baseURL: 'https://api.coffeology.shop',

  // user
  name: '',
  emailValidStatus: false,
  login: 0,

  // recipe
  recipes: [],
  recipesSelection: null,
  recipesSearch: null,
  recipe: null,
  recipeDetails: {},
  recipeSteps: [],
  recipeCreator: [],
  reviews: [],
  difficulties: ['Mudah', 'Sedang', 'Sulit'],

  // recipe demo
  timerNow: 0,
  stepIndex: 0,
  beanRatio: 1,
  waterNow: 0,
  waterLimit: 0,
  stepTime: 0,
  stepWater: 0,

  // beans
  bean: null,
  beans: null,

  // history
  historyID: '',

  // activity
  history: null,
  myBrew: null,


  // search
  searchParams: {},
  searchKeyword: '',
  originsParams: {},
  difficultiesParams: {},
  methodsParams: {},


  // user profile
  userMe: null,
  changePasswordStatus: false,
  editProfileStatus: false,
  Toast: Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 2000,
  }),


  // another user profile
  user: null,
  userBrew: null,


  // method data
  methods: [
    {
      id: 1,
      name: 'French Press',
      icon: require('../assets/images/methodFrenchPress.png'),
    },
    {
      id: 2,
      name: 'Siphon',
      icon: require('../assets/images/methodSiphon.png'),
    },
    {
      id: 3,
      name: 'Chemex',
      icon: require('../assets/images/methodChemex.png'),
    },
    {
      id: 4,
      name: 'Aero Press',
      icon: require('../assets/images/methodAeroPress.png'),
    },
    {
      id: 5,
      name: 'V60',
      icon: require('../assets/images/methodV60.png'),
    },
    {
      id: 6,
      name: 'Moka Pot',
      icon: require('../assets/images/methodMokaPot.png'),
    },
  ],
  methodID: 0,

  // step types data
  stepTypes,
  stepTypeNumber: [1, 2, 3, 4, 5, 6, 7, 8, 12],
  stepTypeNumberSelected: 1,

  // grind size data
  grinds: [
    { id: 1, name: 'sangat halus' },
    { id: 2, name: 'halus' },
    { id: 3, name: 'sedang' },
    { id: 4, name: 'kasar' },
    { id: 5, name: 'sangat kasar' },
  ],

  // recipe flavor data
  flavors: [
    'fragrance',
    'aroma',
    'cleanliness',
    'sweetness',
    'taste',
    'acidity',
    'aftertaste',
    'balance',
    'globalTaste',
    'body',
  ],

  // origin data
  origins: [
    { id: 1, name: 'jawa' },
    { id: 2, name: 'sumatera' },
    { id: 3, name: 'flores' },
    { id: 4, name: 'toraja' },
    { id: 5, name: 'lainnya' },
  ],


  // import button image
  homeButton: require('../assets/images/home.png'),
  menuButton: require('../assets/images/menu.png'),
  backButton: require('../assets/images/back.png'),

  // show when post or put recipe
  showPostRecipe: false,
  showPutRecipe: false,
};

const store = createStore(initialState);

export default store;
