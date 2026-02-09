// 1) Parent component  for  (Index based animation)
export const cardContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    },
  },

};

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
  },
  exit: {
    opacity: 0,
    y: -50,
    filter: "blur(10px)",
    transition: { duration: 0.6 }
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
  },
   exit: {
    opacity: 0,
    y: -50,
    filter: "blur(10px)",
    transition: { duration: 0.6 }
  }
}

// 2) child component for cardContainer^^ (dropping cards)
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


// 3) for logo rotation
export const logoVariants = {
  hidden: {
    rotate: 0,
    opacity: 0,
  },
  visible: {
    rotate: 360,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "linear",
    },
  },
};