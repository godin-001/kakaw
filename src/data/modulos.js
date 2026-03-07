export const modulos = [
  {
    id: 1,
    slug: "trueque",
    titulo: "El Trueque",
    emoji: "🌽",
    badgeNombre: "Experto en Trueque",
    color: "amber",
    kakawDice: "Antes no había dinero. Si querías pescado y tenías maíz, necesitabas encontrar a alguien que tuviera pescado Y quisiera maíz. Al mismo tiempo. Qué estrés.",
    puntosClave: [
      "El trueque = intercambio directo sin dinero",
      "Problema: 'doble coincidencia de deseos' — casi imposible de lograr",
      "¿Pagarías tu café con tres aguacates y medio kilo de tortillas? Eso era la vida.",
    ],
    historia: `Imagínate que vives en el año 3000 a.C. en lo que hoy es México central. Tienes una milpa llena de maíz y tu familia come bien, pero tu vecino tiene pescado fresco del río y tú llevas semanas sin probarlo.

La solución parece simple: vas con él y le propones cambiar maíz por pescado. Pero él ya tiene suficiente maíz. No quiere más. Quiere obsidiana para hacer herramientas.

Bienvenido al caos del trueque: el primer sistema de intercambio de la humanidad. Funcionaba, sí, pero tenía un problema enorme llamado "doble coincidencia de deseos". Para que el intercambio funcionara, tú necesitabas exactamente lo que el otro tenía, y el otro necesitaba exactamente lo que tú ofrecías. Al mismo tiempo. En el mismo lugar.

Era un milagro logístico que algo se intercambiara.

¿Puedes imaginarte intentando pagar tu café de la mañana con tres aguacates y medio kilo de tortillas?`,
    pregunta: "¿Cuál era el principal problema del trueque?",
    opciones: [
      {
        texto: "Necesitabas encontrar a alguien que tuviera lo que querías Y quisiera lo que tú tenías — al mismo tiempo",
        correcto: true,
        feedback: "¡Exacto! La 'doble coincidencia de deseos' hacía casi imposible el comercio. La humanidad necesitaba urgentemente una mejor solución. 🌽",
      },
      {
        texto: "Era muy eficiente, todos intercambiaban felices todo el tiempo",
        correcto: false,
        feedback: "¡Para nada! El trueque era un caos logístico. Casi nadie tenía lo que necesitabas exactamente cuando lo necesitabas.",
      },
      {
        texto: "El gobierno lo prohibió porque perdía control",
        correcto: false,
        feedback: "Todavía no había gobierno central, pero igual el trueque tenía sus propios problemas enormes sin necesitar que nadie lo prohibiera.",
      },
    ],
  },
  {
    id: 2,
    slug: "mercancia",
    titulo: "Dinero Mercancía",
    emoji: "🍫",
    badgeNombre: "Conocedor del Kakaw",
    color: "yellow",
    kakawDice: "Aquí es donde entro yo. Los aztecas usaban granos de cacao como dinero. Un tamal = 3 granos. Un guajolote = 200 granos. Yo era la lana. Literalmente.",
    puntosClave: [
      "El cacao era dinero: escaso, deseado por todos y difícil de falsificar",
      "Pasaba igual en el mundo: sal en Roma (de ahí 'salario'), conchas en Asia, ganado en África",
      "Resolvió el caos del trueque — pero tenía un problema: el cacao se pudre",
    ],
    historia: `Fue entonces cuando nuestra gente tuvo una idea brillante: ¿qué tal si usamos algo que TODOS quieran de todas formas como medio de intercambio?

En Mesoamérica, esa cosa era el cacao. El kakaw. No el chocolate en polvo del súper — las semillas de cacao puras, sagradas, valiosas. Los mexicas las usaban para comprar tamales, mantas, trabajo, incluso para pagar impuestos al tlatoani.

"Tengo kakaw" significaba "tengo poder adquisitivo". Era literalmente la lana.

En otras partes del mundo pasaba lo mismo con cosas distintas: sal en el Imperio Romano (de ahí viene la palabra "salario"), conchas de cauri en África y Asia, telas en Europa. Todos buscando lo mismo: algo que sea escaso, durable, aceptado por todos y difícil de falsificar.

El dinero mercancía resolvió la doble coincidencia de deseos. Ahora podías vender tu maíz por kakaw, guardar el kakaw, y comprar pescado cuando quisieras. El tiempo y el espacio ya no eran obstáculos.

Pero tenía sus propios problemas: ¿qué pasa cuando el cacao se pudre? ¿O cuando alguien cultiva más y baja su valor? La búsqueda del dinero perfecto continuaba...`,
    pregunta: "¿Qué tenían en común el cacao, la sal y las conchas como dinero?",
    opciones: [
      {
        texto: "Los emitía y controlaba un banco central",
        correcto: false,
        feedback: "No había banco central todavía. La comunidad misma decidía qué tenía valor. Era dinero descentralizado — curiosamente parecido a algo que conocerás más adelante 👀",
      },
      {
        texto: "Solo los usaban los nobles y sacerdotes",
        correcto: false,
        feedback: "El kakaw circulaba entre todos — desde el mercader hasta el artesano. Era el dinero del pueblo, no solo de la élite.",
      },
      {
        texto: "Eran escasos, aceptados por todos y difíciles de falsificar o producir en exceso",
        correcto: true,
        feedback: "¡Correcto! Esas son las propiedades del buen dinero. Escasez + aceptación universal + resistencia a la falsificación. Guarda esa lista — la vas a necesitar. 🍫",
      },
    ],
  },
  {
    id: 3,
    slug: "metales",
    titulo: "Metales y Monedas",
    emoji: "🪙",
    badgeNombre: "Guardián de la Casa de Moneda",
    color: "orange",
    kakawDice: "El cacao se pudre. Las conchas se rompen. La sal se disuelve. Llegaron el oro y la plata. No hay resentimientos de mi parte. Los entiendo perfectamente.",
    puntosClave: [
      "Los metales no se echan a perder, son escasos y valen igual en cualquier parte del mundo",
      "México fue POTENCIA mundial de plata — y la primera Casa de Moneda de América fue aquí (1535)",
      "Dato que pocos saben: México inventó el símbolo $. El dólar lo copió después. De nada, mundo.",
    ],
    historia: `El cacao se pudre. Las conchas se rompen. La sal se disuelve. La humanidad necesitaba algo más robusto.

Entonces llegaron los metales. El oro y la plata se volvieron el dinero preferido del mundo, no por decreto de ningún rey, sino porque cumplían con algo que el cacao nunca pudo: duraban para siempre, venían en cantidades limitadas de la tierra, podías fundirlos y dividirlos exactamente, y valían igual en México que en China.

En 1535, los españoles establecieron en la Ciudad de México la primera Casa de Moneda de América. Ahí se acuñaba el Real de a Ocho — la moneda que literalmente se usó en todo el mundo durante 300 años. Los piratas del Caribe que ves en las películas peleaban por ellas. Los mercaderes chinos las aceptaban sin chistar. Era la primera moneda verdaderamente global.

El problema: cargar oro era peligroso. Los asaltantes, los naufragios, el peso físico. Así que apareció algo nuevo: dejas tu oro con un orfebre de confianza, y él te da un papel que dice "este papel vale tanto oro". Un pagaré. La primera forma de papel moneda.

Conveniente. Práctico. Y el inicio de algo que cambiaría todo para siempre.`,
    pregunta: "¿Por qué el oro y la plata se convirtieron en el dinero preferido del mundo?",
    opciones: [
      {
        texto: "Porque son más brillantes y bonitos que las conchas o el cacao",
        correcto: false,
        feedback: "La estética ayuda, pero no es suficiente para que algo sea dinero universal. El oro ganó por sus propiedades funcionales, no por cómo se ve.",
      },
      {
        texto: "Son escasos, no se oxidan, se pueden dividir con precisión y tienen el mismo valor en cualquier parte del mundo",
        correcto: true,
        feedback: "¡Perfecto! Esas cuatro propiedades los hacían el dinero ideal. Curiosamente, Bitcoin comparte todas esas propiedades — y agrega algunas más. 🪙",
      },
      {
        texto: "Porque el rey los eligió y obligó a todos a usarlos",
        correcto: false,
        feedback: "En realidad, los metales preciosos se adoptaron orgánicamente en culturas que nunca tuvieron contacto entre sí. No necesitaron un decreto real.",
      },
    ],
  },
  {
    id: 4,
    slug: "papel",
    titulo: "Papel y Bancos",
    emoji: "💵",
    badgeNombre: "Analista del Sistema",
    color: "green",
    kakawDice: "El billete nació como recibo de tu oro. Honesto. Práctico. Hasta que en 1971 Nixon dijo 'el dólar ya no necesita oro'. Y desde entonces el dinero vale... porque sí.",
    puntosClave: [
      "Dinero fiat = vale porque el gobierno lo dice, no por ningún respaldo real",
      "Banxico decide cuánto dinero circula. En 30 años el peso perdió más del 80% de su valor",
      "Quien controla la impresora, controla tu dinero",
    ],
    historia: `El papel moneda empezó como algo honesto: un recibo de tu oro. Pero los gobiernos descubrieron algo tentador.

Si la gente confiaba en el papel, ¿quién iba a revisar si realmente había oro suficiente detrás? Poco a poco, los gobiernos fueron imprimiendo más billetes que el oro que tenían. Hasta que en 1971, el presidente Nixon tomó la decisión que cambiaría el dinero para siempre: desvinculó al dólar del oro completamente.

Desde ese momento, el dinero ya no representa nada físico. Es dinero fiat — basado únicamente en la confianza y el decreto del gobierno.

En México, el Banco de México (Banxico) es el responsable de emitir pesos y controlar cuánto circula. Cuando la economía necesita más dinero, lo imprimen. Cuando hay inflación, suben las tasas de interés. Ellos deciden.

¿El resultado? En 1994, un dólar costaba 3.50 pesos. Hoy cuesta más de 17. El peso ha perdido más del 80% de su valor en 30 años. No es un error del sistema — es una función del sistema.

El dinero de papel resolvió el problema de cargar oro. Pero creó uno nuevo: quien controla la impresora, controla tu dinero.`,
    pregunta: "¿Qué respalda el valor de un billete de $500 pesos mexicanos hoy?",
    opciones: [
      {
        texto: "La confianza colectiva en el gobierno mexicano y en el Banco de México",
        correcto: true,
        feedback: "Exactamente. El dinero moderno es 'fiat' — su valor existe porque colectivamente acordamos que existe. Si esa confianza se rompe, como en Venezuela o Argentina, el dinero colapsa. 💵",
      },
      {
        texto: "El oro guardado en las bóvedas del Banco de México",
        correcto: false,
        feedback: "Desde 1971, ninguna moneda importante del mundo está respaldada por oro. Eso se llama el 'patrón oro' y Nixon lo eliminó. Tu billete ya no representa metal.",
      },
      {
        texto: "El trabajo y la productividad de los mexicanos que lo ganan",
        correcto: false,
        feedback: "El trabajo crea valor, pero no respalda directamente el billete. El Banxico puede imprimir más pesos independientemente de cuánto trabaje la economía.",
      },
    ],
  },
  {
    id: 5,
    slug: "digital",
    titulo: "Dinero Digital",
    emoji: "📱",
    badgeNombre: "Nativo Digital",
    color: "blue",
    kakawDice: "Tu saldo bancario no es tuyo — es un número en la base de datos del banco. En 2008 casi todo colapsa. Ese año alguien publicó 9 páginas que cambiarían todo.",
    puntosClave: [
      "Tu dinero en el banco puede bloquearse, limitarse o congelarse cuando ellos quieran",
      "Crisis 2008: los bancos apostaron con el dinero de sus clientes, perdieron, nadie fue a la cárcel",
      "Satoshi Nakamoto propuso: dinero digital, sin bancos, sin gobierno, con reglas fijas",
    ],
    historia: `A finales del siglo XX llegó internet y el dinero se digitalizó. Ya no necesitas cargar billetes — tu saldo vive en una base de datos del banco. Transferencias SPEI, tarjetas de crédito, pagos con el celular, fintech como Mercado Pago.

El dinero se volvió más conveniente que nunca. Un clic y pagas, transfieres, compras en cualquier parte del mundo.

Pero fíjate bien en lo que en realidad está pasando: tu dinero no es un archivo en tu computadora — es un número en la base de datos de tu banco. Y ese banco puede bloquearlo, limitarlo, congelarlo, o simplemente no estar disponible cuando lo necesitas.

En 2008, el sistema financiero global casi colapsa. Los grandes bancos apostaron con el dinero de sus clientes, perdieron, y los gobiernos los rescataron con dinero de los contribuyentes. Los responsables no fueron a la cárcel. Los clientes perdieron sus ahorros.

Ese año, alguien bajo el seudónimo de Satoshi Nakamoto publicó un documento de 9 páginas. Se llamaba "Bitcoin: A Peer-to-Peer Electronic Cash System". Su propuesta: dinero digital que nadie controla, que no necesita bancos ni gobiernos, cuya cantidad está matemáticamente limitada y cuyas reglas no pueden cambiar por decreto.

No era solo tecnología. Era una respuesta a una pregunta de miles de años: ¿puede existir un dinero que nadie pueda manipular?`,
    pregunta: "¿Cuál es la diferencia fundamental entre tu dinero en el banco y Bitcoin?",
    opciones: [
      {
        texto: "Ninguna — ambos son digitales y funcionan igual",
        correcto: false,
        feedback: "Son muy distintos. Tu dinero bancario es un número en la base de datos de alguien más. Bitcoin es un protocolo matemático que nadie controla.",
      },
      {
        texto: "Bitcoin es para ricos e inversores; el banco es para todos",
        correcto: false,
        feedback: "Bitcoin fue diseñado específicamente para personas sin acceso al sistema bancario. Puedes tener Bitcoin con solo un smartphone y conexión a internet — sin cuenta bancaria, sin identificación, sin permiso.",
      },
      {
        texto: "Con Bitcoin tú controlas tu dinero directamente; con el banco, el banco lo controla — tú solo tienes una promesa",
        correcto: true,
        feedback: "¡Exactamente! 'Not your keys, not your coins' es el principio central. Con Bitcoin, si tienes tus llaves privadas, nadie puede bloquear tu dinero. Con el banco, estás a merced de sus políticas. 📱⚡",
      },
    ],
  },
  {
    id: 6,
    slug: "bitcoin",
    titulo: "Bitcoin",
    emoji: "₿",
    badgeNombre: "Bitcoiner Novato",
    color: "orange",
    kakawDice: "Bitcoin es dinero digital que no depende de bancos ni gobiernos. Vive en miles de computadoras a la vez. Solo existirán 21 millones. Nadie lo puede parar ni confiscar.",
    puntosClave: [
      "Blockchain = libro de cuentas público que todos pueden ver y nadie puede alterar",
      "Sin intermediarios · Solo 21 millones · Funciona 24/7/365 sin horario bancario",
      "Remesas baratas, cuenta sin banco, dinero que nadie puede congelarte — si guardas tus llaves",
    ],
    historia: `Bitcoin es dinero digital que NO depende de bancos ni gobiernos. Vive en una red de miles de computadoras llamada blockchain.

El blockchain es como un libro de cuentas que todos pueden ver y nadie puede alterar. Si alguien intenta hacer trampa, miles de computadoras lo rechazan automáticamente. No hay jefe, no hay sede central, no hay un botón de apagado.

¿Qué lo hace diferente a todo lo anterior?
- Sin intermediarios: tú envías directo, sin banco en medio
- Limitado matemáticamente: solo existirán 21 millones de bitcoins. Nunca más.
- Funciona 24/7/365: no hay horario bancario, no hay días festivos, no hay "intente más tarde"

¿Por qué importa para ti?
Remesas sin comisiones abusivas. Tu dinero disponible siempre, desde cualquier país. Nadie puede congelarte la cuenta si tienes tus propias llaves privadas.

Yo, Kakaw, fui dinero antes que el oro. Vi llegar el papel, las tarjetas, y ahora Bitcoin. El dinero siempre evoluciona. Y esta vez, por primera vez en la historia, la escasez está garantizada por matemáticas — no por promesas de ningún gobierno.`,
    pregunta: "¿Qué hace a Bitcoin fundamentalmente diferente de cualquier otro dinero que ha existido?",
    opciones: [
      {
        texto: "Es el único dinero que funciona completamente en internet",
        correcto: false,
        feedback: "El dinero bancario digital también funciona en internet. Lo diferente de Bitcoin no es que sea digital — es que nadie lo controla y su escasez está garantizada por matemáticas, no por promesas.",
      },
      {
        texto: "Tiene escasez matemática garantizada, no depende de ningún gobierno y nadie puede cambiar sus reglas",
        correcto: true,
        feedback: "¡Exacto! Por primera vez en la historia existe un dinero cuya escasez está garantizada por código, no por promesas de ningún gobierno. Satoshi resolvió algo que nadie había podido en miles de años. ₿⚡",
      },
      {
        texto: "Es solo para programadores y personas muy técnicas",
        correcto: false,
        feedback: "Bitcoin fue diseñado para ser accesible para todos. Si tienes un smartphone y conexión a internet, ya puedes tener Bitcoin — sin banco, sin identificación, sin permiso de nadie.",
      },
    ],
  },
]
