module animal{
  class Client{
    main(){
      this.callAnimal();
      this.callCat(new Dog());
      this.hiDog();

    }

    callAnimal(){

    }

    /**
   * @param cat 叫猫
   * @returns      是猫就是得死
   */
    callCat(cat:Cat){

    }

    /**
   * @param dog 我是一只狗啊，一只狗
   * @returns      什么狗不狗的，你就是一个畜生
   */
    hiDog(dog?:Dog):Animal{
      return new Dog();
    }
  }

}
