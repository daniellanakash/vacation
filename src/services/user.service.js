class UserService {

   constructor() {
      this.user = {};
      const user = sessionStorage.getItem('vacation_user');
      if (user) {
         this.user = JSON.parse(user);
      }
   }

   isLoggedIn() {
      if (this.user.id) {
         return true;
      }
      return false;
   }


}

export default new UserService;