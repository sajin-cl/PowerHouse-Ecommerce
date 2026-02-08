//Parent component 
export const cardContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    },
  },

};

//child component for cardContainer^^
export const droppingCard = {

  hidden: {
    y: -40,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },

}


//cardFromLeft & cardFromRight used for Admin Orders (Index based animation)
export const cardFromLeft = {
  hidden: {
    x: -100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export const cardFromRight = {
  hidden: {
    x: 100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}