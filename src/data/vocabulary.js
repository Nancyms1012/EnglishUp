// Base de datos de vocabulario - preparada para multi-idioma
// Niveles: 1 = Principiante, 2 = Básico, 3 = Intermedio, 4 = Avanzado

export const vocabulary = [
  // =============================================
  // === SALUDOS (Greetings) ===
  // =============================================
  { id: 1, es: 'Hola', translations: { en: 'Hello', fr: 'Bonjour', it: 'Ciao', pt: 'Olá', de: 'Hallo' }, category: 'greetings', level: 1, example: { en: 'Hello, how are you?', es: 'Hola, ¿cómo estás?' } },
  { id: 2, es: 'Buenos días', translations: { en: 'Good morning', fr: 'Bonjour', it: 'Buongiorno', pt: 'Bom dia', de: 'Guten Morgen' }, category: 'greetings', level: 1, example: { en: 'Good morning! Did you sleep well?', es: 'Buenos días! ¿Dormiste bien?' } },
  { id: 3, es: 'Buenas noches', translations: { en: 'Good night', fr: 'Bonne nuit', it: 'Buonanotte', pt: 'Boa noite', de: 'Gute Nacht' }, category: 'greetings', level: 1, example: { en: 'Good night, see you tomorrow!', es: 'Buenas noches, ¡nos vemos mañana!' } },
  { id: 4, es: '¿Cómo estás?', translations: { en: 'How are you?', fr: 'Comment allez-vous?', it: 'Come stai?', pt: 'Como você está?', de: 'Wie geht es dir?' }, category: 'greetings', level: 1, example: { en: 'Hi! How are you today?', es: 'Hola! ¿Cómo estás hoy?' } },
  { id: 5, es: 'Mucho gusto', translations: { en: 'Nice to meet you', fr: 'Enchanté', it: 'Piacere', pt: 'Prazer em conhecê-lo', de: 'Freut mich' }, category: 'greetings', level: 1, example: { en: 'Nice to meet you, my name is Carlos.', es: 'Mucho gusto, mi nombre es Carlos.' } },
  { id: 6, es: 'Adiós', translations: { en: 'Goodbye', fr: 'Au revoir', it: 'Arrivederci', pt: 'Adeus', de: 'Auf Wiedersehen' }, category: 'greetings', level: 1, example: { en: 'Goodbye! Have a nice day!', es: '¡Adiós! ¡Que tengas un buen día!' } },
  { id: 7, es: 'Por favor', translations: { en: 'Please', fr: "S'il vous plaît", it: 'Per favore', pt: 'Por favor', de: 'Bitte' }, category: 'greetings', level: 1, example: { en: 'Can you help me, please?', es: '¿Puedes ayudarme, por favor?' } },
  { id: 8, es: 'Gracias', translations: { en: 'Thank you', fr: 'Merci', it: 'Grazie', pt: 'Obrigado', de: 'Danke' }, category: 'greetings', level: 1, example: { en: 'Thank you very much!', es: '¡Muchas gracias!' } },
  { id: 9, es: 'De nada', translations: { en: "You're welcome", fr: 'De rien', it: 'Prego', pt: 'De nada', de: 'Bitte schön' }, category: 'greetings', level: 1, example: { en: "You're welcome! It was no problem.", es: '¡De nada! No fue ningún problema.' } },
  { id: 10, es: 'Disculpa', translations: { en: 'Excuse me', fr: 'Excusez-moi', it: 'Scusami', pt: 'Com licença', de: 'Entschuldigung' }, category: 'greetings', level: 2, example: { en: 'Excuse me, where is the bathroom?', es: 'Disculpa, ¿dónde está el baño?' } },
  { id: 41, es: 'Lo siento', translations: { en: "I'm sorry", fr: 'Je suis désolé', it: 'Mi dispiace', pt: 'Sinto muito', de: 'Es tut mir leid' }, category: 'greetings', level: 2, example: { en: "I'm sorry for being late.", es: 'Lo siento por llegar tarde.' } },
  { id: 42, es: '¿Podría repetir eso?', translations: { en: 'Could you repeat that?', fr: 'Pourriez-vous répéter?', it: 'Potrebbe ripetere?', pt: 'Poderia repetir?', de: 'Könnten Sie das wiederholen?' }, category: 'greetings', level: 3, example: { en: "I didn't understand. Could you repeat that?", es: 'No entendí. ¿Podría repetir eso?' } },
  { id: 43, es: 'Ha sido un placer', translations: { en: "It's been a pleasure", fr: "C'était un plaisir", it: 'È stato un piacere', pt: 'Foi um prazer', de: 'Es war mir ein Vergnügen' }, category: 'greetings', level: 3, example: { en: "It's been a pleasure meeting you.", es: 'Ha sido un placer conocerte.' } },
  { id: 44, es: 'No hablo bien inglés', translations: { en: "I don't speak English well", fr: 'Je ne parle pas bien anglais', it: 'Non parlo bene inglese', pt: 'Não falo bem inglês', de: 'Ich spreche nicht gut Englisch' }, category: 'greetings', level: 2, example: { en: "I don't speak English well, but I'm learning.", es: 'No hablo bien inglés, pero estoy aprendiendo.' } },

  // =============================================
  // === COMIDA (Food) ===
  // =============================================
  { id: 11, es: 'Desayuno', translations: { en: 'Breakfast', fr: 'Petit-déjeuner', it: 'Colazione', pt: 'Café da manhã', de: 'Frühstück' }, category: 'food', level: 1, example: { en: 'I eat breakfast at 7 AM.', es: 'Desayuno a las 7 AM.' } },
  { id: 12, es: 'Almuerzo', translations: { en: 'Lunch', fr: 'Déjeuner', it: 'Pranzo', pt: 'Almoço', de: 'Mittagessen' }, category: 'food', level: 1, example: { en: 'What do you want for lunch?', es: '¿Qué quieres para almorzar?' } },
  { id: 13, es: 'Cena', translations: { en: 'Dinner', fr: 'Dîner', it: 'Cena', pt: 'Jantar', de: 'Abendessen' }, category: 'food', level: 1, example: { en: 'Dinner is ready!', es: '¡La cena está lista!' } },
  { id: 14, es: 'Agua', translations: { en: 'Water', fr: 'Eau', it: 'Acqua', pt: 'Água', de: 'Wasser' }, category: 'food', level: 1, example: { en: 'Can I have a glass of water?', es: '¿Puedo tener un vaso de agua?' } },
  { id: 15, es: 'La cuenta, por favor', translations: { en: 'The check, please', fr: "L'addition, s'il vous plaît", it: 'Il conto, per favore', pt: 'A conta, por favor', de: 'Die Rechnung, bitte' }, category: 'food', level: 2, example: { en: 'We are finished. The check, please.', es: 'Terminamos. La cuenta, por favor.' } },
  { id: 16, es: 'Tengo hambre', translations: { en: "I'm hungry", fr: "J'ai faim", it: 'Ho fame', pt: 'Estou com fome', de: 'Ich habe Hunger' }, category: 'food', level: 2, example: { en: "I'm hungry. Let's eat something.", es: 'Tengo hambre. Comamos algo.' } },
  { id: 17, es: 'Delicioso', translations: { en: 'Delicious', fr: 'Délicieux', it: 'Delizioso', pt: 'Delicioso', de: 'Köstlich' }, category: 'food', level: 1, example: { en: 'This food is delicious!', es: '¡Esta comida es deliciosa!' } },
  { id: 45, es: 'Soy alérgico a...', translations: { en: "I'm allergic to...", fr: 'Je suis allergique à...', it: 'Sono allergico a...', pt: 'Sou alérgico a...', de: 'Ich bin allergisch gegen...' }, category: 'food', level: 3, example: { en: "I'm allergic to nuts.", es: 'Soy alérgico a los frutos secos.' } },
  { id: 46, es: 'Me gustaría reservar una mesa', translations: { en: "I'd like to reserve a table", fr: 'Je voudrais réserver une table', it: 'Vorrei prenotare un tavolo', pt: 'Gostaria de reservar uma mesa', de: 'Ich möchte einen Tisch reservieren' }, category: 'food', level: 3, example: { en: "I'd like to reserve a table for two at 8 PM.", es: 'Me gustaría reservar una mesa para dos a las 8 PM.' } },
  { id: 47, es: '¿Qué me recomienda?', translations: { en: 'What do you recommend?', fr: 'Que recommandez-vous?', it: 'Cosa mi consiglia?', pt: 'O que você recomenda?', de: 'Was empfehlen Sie?' }, category: 'food', level: 2, example: { en: "What do you recommend? It's my first time here.", es: '¿Qué me recomienda? Es mi primera vez aquí.' } },
  { id: 48, es: 'Sin gluten', translations: { en: 'Gluten-free', fr: 'Sans gluten', it: 'Senza glutine', pt: 'Sem glúten', de: 'Glutenfrei' }, category: 'food', level: 2, example: { en: 'Do you have gluten-free options?', es: '¿Tienen opciones sin gluten?' } },
  { id: 49, es: 'Propina', translations: { en: 'Tip', fr: 'Pourboire', it: 'Mancia', pt: 'Gorjeta', de: 'Trinkgeld' }, category: 'food', level: 2, example: { en: 'The service was great, I left a big tip.', es: 'El servicio fue excelente, dejé una buena propina.' } },

  // =============================================
  // === VIAJES (Travel) ===
  // =============================================
  { id: 18, es: '¿Dónde está...?', translations: { en: 'Where is...?', fr: 'Où est...?', it: 'Dove è...?', pt: 'Onde está...?', de: 'Wo ist...?' }, category: 'travel', level: 1, example: { en: 'Where is the train station?', es: '¿Dónde está la estación de tren?' } },
  { id: 19, es: 'Aeropuerto', translations: { en: 'Airport', fr: 'Aéroport', it: 'Aeroporto', pt: 'Aeroporto', de: 'Flughafen' }, category: 'travel', level: 1, example: { en: 'The airport is 20 minutes away.', es: 'El aeropuerto está a 20 minutos.' } },
  { id: 20, es: 'Hotel', translations: { en: 'Hotel', fr: 'Hôtel', it: 'Hotel', pt: 'Hotel', de: 'Hotel' }, category: 'travel', level: 1, example: { en: 'I booked a hotel near the beach.', es: 'Reservé un hotel cerca de la playa.' } },
  { id: 21, es: 'Necesito ayuda', translations: { en: 'I need help', fr: "J'ai besoin d'aide", it: 'Ho bisogno di aiuto', pt: 'Preciso de ajuda', de: 'Ich brauche Hilfe' }, category: 'travel', level: 2, example: { en: "I need help, I'm lost.", es: 'Necesito ayuda, estoy perdido.' } },
  { id: 22, es: '¿Cuánto cuesta?', translations: { en: 'How much does it cost?', fr: 'Combien ça coûte?', it: 'Quanto costa?', pt: 'Quanto custa?', de: 'Wie viel kostet das?' }, category: 'travel', level: 2, example: { en: 'How much does it cost per night?', es: '¿Cuánto cuesta por noche?' } },
  { id: 50, es: 'Boleto de ida y vuelta', translations: { en: 'Round-trip ticket', fr: 'Billet aller-retour', it: 'Biglietto andata e ritorno', pt: 'Passagem de ida e volta', de: 'Hin- und Rückfahrkarte' }, category: 'travel', level: 3, example: { en: 'I need a round-trip ticket to Madrid.', es: 'Necesito un boleto de ida y vuelta a Madrid.' } },
  { id: 51, es: 'Puerta de embarque', translations: { en: 'Boarding gate', fr: "Porte d'embarquement", it: "Porta d'imbarco", pt: 'Portão de embarque', de: 'Flugsteig' }, category: 'travel', level: 3, example: { en: 'The boarding gate closes in 10 minutes.', es: 'La puerta de embarque cierra en 10 minutos.' } },
  { id: 52, es: 'Equipaje', translations: { en: 'Luggage', fr: 'Bagages', it: 'Bagaglio', pt: 'Bagagem', de: 'Gepäck' }, category: 'travel', level: 2, example: { en: 'My luggage is lost.', es: 'Mi equipaje se perdió.' } },
  { id: 53, es: '¿A qué hora sale el vuelo?', translations: { en: 'What time does the flight leave?', fr: "À quelle heure part le vol?", it: "A che ora parte il volo?", pt: 'A que horas sai o voo?', de: 'Wann geht der Flug?' }, category: 'travel', level: 3, example: { en: 'What time does the flight leave? I need to check in.', es: '¿A qué hora sale el vuelo? Necesito hacer check-in.' } },
  { id: 54, es: 'Reservación', translations: { en: 'Reservation', fr: 'Réservation', it: 'Prenotazione', pt: 'Reserva', de: 'Reservierung' }, category: 'travel', level: 2, example: { en: 'I have a reservation under the name Garcia.', es: 'Tengo una reservación a nombre de Garcia.' } },
  { id: 55, es: 'Pasaporte', translations: { en: 'Passport', fr: 'Passeport', it: 'Passaporto', pt: 'Passaporte', de: 'Reisepass' }, category: 'travel', level: 1, example: { en: 'Please show me your passport.', es: 'Por favor muéstreme su pasaporte.' } },
  { id: 56, es: 'Cambio de moneda', translations: { en: 'Currency exchange', fr: 'Bureau de change', it: 'Cambio valuta', pt: 'Casa de câmbio', de: 'Geldwechsel' }, category: 'travel', level: 3, example: { en: 'Where can I find a currency exchange?', es: '¿Dónde puedo encontrar un cambio de moneda?' } },

  // =============================================
  // === TRABAJO (Work) ===
  // =============================================
  { id: 23, es: 'Reunión', translations: { en: 'Meeting', fr: 'Réunion', it: 'Riunione', pt: 'Reunião', de: 'Besprechung' }, category: 'work', level: 2, example: { en: 'The meeting starts at 9 AM.', es: 'La reunión empieza a las 9 AM.' } },
  { id: 24, es: 'Correo electrónico', translations: { en: 'Email', fr: 'E-mail', it: 'E-mail', pt: 'E-mail', de: 'E-Mail' }, category: 'work', level: 1, example: { en: 'I sent you an email yesterday.', es: 'Te envié un correo electrónico ayer.' } },
  { id: 25, es: 'Fecha límite', translations: { en: 'Deadline', fr: 'Date limite', it: 'Scadenza', pt: 'Prazo', de: 'Frist' }, category: 'work', level: 3, example: { en: 'The deadline is next Friday.', es: 'La fecha límite es el próximo viernes.' } },
  { id: 57, es: 'Trabajo en equipo', translations: { en: 'Teamwork', fr: "Travail d'équipe", it: 'Lavoro di squadra', pt: 'Trabalho em equipe', de: 'Teamarbeit' }, category: 'work', level: 2, example: { en: 'Teamwork is essential for this project.', es: 'El trabajo en equipo es esencial para este proyecto.' } },
  { id: 58, es: 'Entrevista de trabajo', translations: { en: 'Job interview', fr: "Entretien d'embauche", it: 'Colloquio di lavoro', pt: 'Entrevista de emprego', de: 'Vorstellungsgespräch' }, category: 'work', level: 3, example: { en: 'I have a job interview tomorrow morning.', es: 'Tengo una entrevista de trabajo mañana por la mañana.' } },
  { id: 59, es: 'Jefe', translations: { en: 'Boss', fr: 'Patron', it: 'Capo', pt: 'Chefe', de: 'Chef' }, category: 'work', level: 1, example: { en: 'My boss is very friendly.', es: 'Mi jefe es muy amigable.' } },
  { id: 60, es: 'Salario', translations: { en: 'Salary', fr: 'Salaire', it: 'Stipendio', pt: 'Salário', de: 'Gehalt' }, category: 'work', level: 2, example: { en: 'The salary is paid monthly.', es: 'El salario se paga mensualmente.' } },
  { id: 61, es: 'Estoy buscando trabajo', translations: { en: "I'm looking for a job", fr: 'Je cherche un emploi', it: 'Sto cercando lavoro', pt: 'Estou procurando emprego', de: 'Ich suche einen Job' }, category: 'work', level: 3, example: { en: "I'm looking for a job in marketing.", es: 'Estoy buscando trabajo en marketing.' } },
  { id: 62, es: 'Horas extras', translations: { en: 'Overtime', fr: 'Heures supplémentaires', it: 'Straordinari', pt: 'Hora extra', de: 'Überstunden' }, category: 'work', level: 3, example: { en: 'I worked overtime this week.', es: 'Trabajé horas extras esta semana.' } },
  { id: 63, es: 'Currículum', translations: { en: 'Resume', fr: 'CV', it: 'Curriculum', pt: 'Currículo', de: 'Lebenslauf' }, category: 'work', level: 3, example: { en: 'Please send your resume by email.', es: 'Por favor envíe su currículum por email.' } },
  { id: 64, es: 'Vacaciones', translations: { en: 'Vacation', fr: 'Vacances', it: 'Vacanze', pt: 'Férias', de: 'Urlaub' }, category: 'work', level: 2, example: { en: 'I need a vacation. I am exhausted.', es: 'Necesito vacaciones. Estoy agotado.' } },
  { id: 65, es: 'Contrato', translations: { en: 'Contract', fr: 'Contrat', it: 'Contratto', pt: 'Contrato', de: 'Vertrag' }, category: 'work', level: 3, example: { en: 'I signed the contract yesterday.', es: 'Firmé el contrato ayer.' } },

  // =============================================
  // === TECNOLOGÍA (Technology) ===
  // =============================================
  { id: 26, es: 'Contraseña', translations: { en: 'Password', fr: 'Mot de passe', it: 'Password', pt: 'Senha', de: 'Passwort' }, category: 'technology', level: 1, example: { en: 'Please enter your password.', es: 'Por favor ingresa tu contraseña.' } },
  { id: 27, es: 'Descargar', translations: { en: 'Download', fr: 'Télécharger', it: 'Scaricare', pt: 'Baixar', de: 'Herunterladen' }, category: 'technology', level: 2, example: { en: 'You can download the app for free.', es: 'Puedes descargar la app gratis.' } },
  { id: 28, es: 'Buscar', translations: { en: 'Search', fr: 'Chercher', it: 'Cercare', pt: 'Buscar', de: 'Suchen' }, category: 'technology', level: 1, example: { en: 'Search for restaurants near you.', es: 'Busca restaurantes cerca de ti.' } },
  { id: 66, es: 'Actualizar', translations: { en: 'Update', fr: 'Mettre à jour', it: 'Aggiornare', pt: 'Atualizar', de: 'Aktualisieren' }, category: 'technology', level: 2, example: { en: 'You need to update your phone.', es: 'Necesitas actualizar tu teléfono.' } },
  { id: 67, es: 'Red inalámbrica', translations: { en: 'Wi-Fi', fr: 'Wi-Fi', it: 'Wi-Fi', pt: 'Wi-Fi', de: 'WLAN' }, category: 'technology', level: 1, example: { en: 'What is the Wi-Fi password?', es: '¿Cuál es la contraseña del Wi-Fi?' } },
  { id: 68, es: 'Copia de seguridad', translations: { en: 'Backup', fr: 'Sauvegarde', it: 'Backup', pt: 'Backup', de: 'Sicherungskopie' }, category: 'technology', level: 3, example: { en: 'Always make a backup of your files.', es: 'Siempre haz una copia de seguridad de tus archivos.' } },
  { id: 69, es: 'Pantalla', translations: { en: 'Screen', fr: 'Écran', it: 'Schermo', pt: 'Tela', de: 'Bildschirm' }, category: 'technology', level: 1, example: { en: 'The screen is too bright.', es: 'La pantalla está muy brillante.' } },
  { id: 70, es: 'Inteligencia artificial', translations: { en: 'Artificial intelligence', fr: 'Intelligence artificielle', it: 'Intelligenza artificiale', pt: 'Inteligência artificial', de: 'Künstliche Intelligenz' }, category: 'technology', level: 4, example: { en: 'Artificial intelligence is changing the world.', es: 'La inteligencia artificial está cambiando el mundo.' } },
  { id: 71, es: 'Almacenamiento en la nube', translations: { en: 'Cloud storage', fr: 'Stockage en nuage', it: 'Archiviazione cloud', pt: 'Armazenamento em nuvem', de: 'Cloud-Speicher' }, category: 'technology', level: 4, example: { en: 'I save all my photos in cloud storage.', es: 'Guardo todas mis fotos en almacenamiento en la nube.' } },
  { id: 72, es: 'Correo no deseado', translations: { en: 'Spam', fr: 'Courrier indésirable', it: 'Spam', pt: 'Spam', de: 'Spam' }, category: 'technology', level: 2, example: { en: 'Check your spam folder for the email.', es: 'Revisa tu carpeta de correo no deseado.' } },

  // =============================================
  // === COMPRAS (Shopping) ===
  // =============================================
  { id: 29, es: 'Precio', translations: { en: 'Price', fr: 'Prix', it: 'Prezzo', pt: 'Preço', de: 'Preis' }, category: 'shopping', level: 1, example: { en: 'What is the price of this shirt?', es: '¿Cuál es el precio de esta camisa?' } },
  { id: 30, es: 'Descuento', translations: { en: 'Discount', fr: 'Réduction', it: 'Sconto', pt: 'Desconto', de: 'Rabatt' }, category: 'shopping', level: 2, example: { en: 'There is a 50% discount today.', es: 'Hay un 50% de descuento hoy.' } },
  { id: 73, es: 'Talla', translations: { en: 'Size', fr: 'Taille', it: 'Taglia', pt: 'Tamanho', de: 'Größe' }, category: 'shopping', level: 1, example: { en: 'Do you have this in a larger size?', es: '¿Tienen esto en una talla más grande?' } },
  { id: 74, es: 'Probador', translations: { en: 'Fitting room', fr: 'Cabine dessayage', it: 'Camerino', pt: 'Provador', de: 'Umkleidekabine' }, category: 'shopping', level: 2, example: { en: 'Where is the fitting room?', es: '¿Dónde está el probador?' } },
  { id: 75, es: 'Devolver', translations: { en: 'Return', fr: 'Retourner', it: 'Restituire', pt: 'Devolver', de: 'Zurückgeben' }, category: 'shopping', level: 2, example: { en: "I'd like to return this item.", es: 'Me gustaría devolver este artículo.' } },
  { id: 76, es: 'Efectivo', translations: { en: 'Cash', fr: 'Espèces', it: 'Contanti', pt: 'Dinheiro', de: 'Bargeld' }, category: 'shopping', level: 1, example: { en: 'Do you accept cash?', es: '¿Aceptan efectivo?' } },
  { id: 77, es: 'Tarjeta de crédito', translations: { en: 'Credit card', fr: 'Carte de crédit', it: 'Carta di credito', pt: 'Cartão de crédito', de: 'Kreditkarte' }, category: 'shopping', level: 2, example: { en: 'Can I pay with a credit card?', es: '¿Puedo pagar con tarjeta de crédito?' } },
  { id: 78, es: 'Garantía', translations: { en: 'Warranty', fr: 'Garantie', it: 'Garanzia', pt: 'Garantia', de: 'Garantie' }, category: 'shopping', level: 3, example: { en: 'Does this product come with a warranty?', es: '¿Este producto viene con garantía?' } },
  { id: 79, es: 'Reembolso', translations: { en: 'Refund', fr: 'Remboursement', it: 'Rimborso', pt: 'Reembolso', de: 'Rückerstattung' }, category: 'shopping', level: 3, example: { en: 'I would like a refund, please.', es: 'Me gustaría un reembolso, por favor.' } },
  { id: 80, es: 'En oferta', translations: { en: 'On sale', fr: 'En solde', it: 'In saldo', pt: 'Em promoção', de: 'Im Angebot' }, category: 'shopping', level: 2, example: { en: 'These shoes are on sale this week.', es: 'Estos zapatos están en oferta esta semana.' } },

  // =============================================
  // === SALUD (Health) ===
  // =============================================
  { id: 31, es: 'Me siento mal', translations: { en: "I don't feel well", fr: 'Je ne me sens pas bien', it: 'Non mi sento bene', pt: 'Não me sinto bem', de: 'Ich fühle mich nicht gut' }, category: 'health', level: 2, example: { en: "I don't feel well. I need a doctor.", es: 'Me siento mal. Necesito un doctor.' } },
  { id: 32, es: 'Hospital', translations: { en: 'Hospital', fr: 'Hôpital', it: 'Ospedale', pt: 'Hospital', de: 'Krankenhaus' }, category: 'health', level: 1, example: { en: 'The hospital is on the next street.', es: 'El hospital está en la próxima calle.' } },
  { id: 81, es: 'Dolor de cabeza', translations: { en: 'Headache', fr: 'Mal de tête', it: 'Mal di testa', pt: 'Dor de cabeça', de: 'Kopfschmerzen' }, category: 'health', level: 2, example: { en: 'I have a terrible headache.', es: 'Tengo un terrible dolor de cabeza.' } },
  { id: 82, es: 'Receta médica', translations: { en: 'Prescription', fr: 'Ordonnance', it: 'Ricetta medica', pt: 'Receita médica', de: 'Rezept' }, category: 'health', level: 3, example: { en: 'You need a prescription for this medicine.', es: 'Necesitas una receta médica para esta medicina.' } },
  { id: 83, es: 'Urgencia', translations: { en: 'Emergency', fr: 'Urgence', it: 'Emergenza', pt: 'Emergência', de: 'Notfall' }, category: 'health', level: 2, example: { en: 'This is an emergency! Call an ambulance!', es: '¡Esto es una urgencia! ¡Llama una ambulancia!' } },
  { id: 84, es: 'Seguro médico', translations: { en: 'Health insurance', fr: 'Assurance maladie', it: 'Assicurazione sanitaria', pt: 'Seguro de saúde', de: 'Krankenversicherung' }, category: 'health', level: 3, example: { en: 'Do you have health insurance?', es: '¿Tienes seguro médico?' } },
  { id: 85, es: 'Farmacia', translations: { en: 'Pharmacy', fr: 'Pharmacie', it: 'Farmacia', pt: 'Farmácia', de: 'Apotheke' }, category: 'health', level: 1, example: { en: 'The pharmacy is open until 10 PM.', es: 'La farmacia está abierta hasta las 10 PM.' } },
  { id: 86, es: 'Me duele aquí', translations: { en: 'It hurts here', fr: "J'ai mal ici", it: 'Mi fa male qui', pt: 'Dói aqui', de: 'Es tut hier weh' }, category: 'health', level: 2, example: { en: 'Doctor, it hurts here when I move.', es: 'Doctor, me duele aquí cuando me muevo.' } },
  { id: 87, es: 'Tengo fiebre', translations: { en: 'I have a fever', fr: "J'ai de la fièvre", it: 'Ho la febbre', pt: 'Estou com febre', de: 'Ich habe Fieber' }, category: 'health', level: 2, example: { en: 'I have a fever and a sore throat.', es: 'Tengo fiebre y dolor de garganta.' } },

  // =============================================
  // === ENTRETENIMIENTO (Entertainment) ===
  // =============================================
  { id: 33, es: 'Película', translations: { en: 'Movie', fr: 'Film', it: 'Film', pt: 'Filme', de: 'Film' }, category: 'entertainment', level: 1, example: { en: "Let's watch a movie tonight.", es: 'Veamos una película esta noche.' } },
  { id: 34, es: 'Canción', translations: { en: 'Song', fr: 'Chanson', it: 'Canzone', pt: 'Música', de: 'Lied' }, category: 'entertainment', level: 1, example: { en: 'This is my favorite song.', es: 'Esta es mi canción favorita.' } },
  { id: 88, es: 'Concierto', translations: { en: 'Concert', fr: 'Concert', it: 'Concerto', pt: 'Concerto', de: 'Konzert' }, category: 'entertainment', level: 2, example: { en: 'The concert starts at 9 PM.', es: 'El concierto empieza a las 9 PM.' } },
  { id: 89, es: 'Entradas', translations: { en: 'Tickets', fr: 'Billets', it: 'Biglietti', pt: 'Ingressos', de: 'Eintrittskarten' }, category: 'entertainment', level: 2, example: { en: 'I bought two tickets for the show.', es: 'Compré dos entradas para el espectáculo.' } },
  { id: 90, es: '¿Qué estás leyendo?', translations: { en: 'What are you reading?', fr: 'Que lis-tu?', it: 'Cosa stai leggendo?', pt: 'O que você está lendo?', de: 'Was liest du?' }, category: 'entertainment', level: 2, example: { en: "What are you reading? It looks interesting.", es: '¿Qué estás leyendo? Se ve interesante.' } },
  { id: 91, es: 'Tiempo libre', translations: { en: 'Free time', fr: 'Temps libre', it: 'Tempo libero', pt: 'Tempo livre', de: 'Freizeit' }, category: 'entertainment', level: 2, example: { en: 'What do you do in your free time?', es: '¿Qué haces en tu tiempo libre?' } },
  { id: 92, es: 'Estoy aburrido', translations: { en: "I'm bored", fr: "Je m'ennuie", it: 'Mi annoio', pt: 'Estou entediado', de: 'Mir ist langweilig' }, category: 'entertainment', level: 2, example: { en: "I'm bored. Let's do something fun!", es: 'Estoy aburrido. ¡Hagamos algo divertido!' } },
  { id: 93, es: 'Temporada', translations: { en: 'Season', fr: 'Saison', it: 'Stagione', pt: 'Temporada', de: 'Staffel' }, category: 'entertainment', level: 3, example: { en: 'Have you seen the new season of that show?', es: '¿Has visto la nueva temporada de esa serie?' } },

  // =============================================
  // === FAMILIA (Family) ===
  // =============================================
  { id: 35, es: 'Madre', translations: { en: 'Mother', fr: 'Mère', it: 'Madre', pt: 'Mãe', de: 'Mutter' }, category: 'family', level: 1, example: { en: 'My mother is very kind.', es: 'Mi madre es muy amable.' } },
  { id: 36, es: 'Padre', translations: { en: 'Father', fr: 'Père', it: 'Padre', pt: 'Pai', de: 'Vater' }, category: 'family', level: 1, example: { en: 'My father works in an office.', es: 'Mi padre trabaja en una oficina.' } },
  { id: 37, es: 'Hermano', translations: { en: 'Brother', fr: 'Frère', it: 'Fratello', pt: 'Irmão', de: 'Bruder' }, category: 'family', level: 1, example: { en: 'I have two brothers.', es: 'Tengo dos hermanos.' } },
  { id: 38, es: 'Hermana', translations: { en: 'Sister', fr: 'Sœur', it: 'Sorella', pt: 'Irmã', de: 'Schwester' }, category: 'family', level: 1, example: { en: 'My sister lives in another city.', es: 'Mi hermana vive en otra ciudad.' } },
  { id: 94, es: 'Esposo/Esposa', translations: { en: 'Husband/Wife', fr: 'Mari/Femme', it: 'Marito/Moglie', pt: 'Marido/Esposa', de: 'Ehemann/Ehefrau' }, category: 'family', level: 2, example: { en: 'My wife works as a teacher.', es: 'Mi esposa trabaja como profesora.' } },
  { id: 95, es: 'Hijo/Hija', translations: { en: 'Son/Daughter', fr: 'Fils/Fille', it: 'Figlio/Figlia', pt: 'Filho/Filha', de: 'Sohn/Tochter' }, category: 'family', level: 1, example: { en: 'My daughter is 5 years old.', es: 'Mi hija tiene 5 años.' } },
  { id: 96, es: 'Abuelo/Abuela', translations: { en: 'Grandfather/Grandmother', fr: 'Grand-père/Grand-mère', it: 'Nonno/Nonna', pt: 'Avô/Avó', de: 'Großvater/Großmutter' }, category: 'family', level: 2, example: { en: 'My grandmother makes the best cookies.', es: 'Mi abuela hace las mejores galletas.' } },
  { id: 97, es: 'Sobrino/Sobrina', translations: { en: 'Nephew/Niece', fr: 'Neveu/Nièce', it: 'Nipote', pt: 'Sobrinho/Sobrinha', de: 'Neffe/Nichte' }, category: 'family', level: 3, example: { en: 'My nephew is learning to walk.', es: 'Mi sobrino está aprendiendo a caminar.' } },
  { id: 98, es: 'Embarazada', translations: { en: 'Pregnant', fr: 'Enceinte', it: 'Incinta', pt: 'Grávida', de: 'Schwanger' }, category: 'family', level: 3, example: { en: 'My sister is pregnant with twins!', es: '¡Mi hermana está embarazada de gemelos!' } },

  // =============================================
  // === NATURALEZA (Nature) ===
  // =============================================
  { id: 39, es: 'Playa', translations: { en: 'Beach', fr: 'Plage', it: 'Spiaggia', pt: 'Praia', de: 'Strand' }, category: 'nature', level: 1, example: { en: 'The beach is beautiful today.', es: 'La playa está hermosa hoy.' } },
  { id: 40, es: 'Montaña', translations: { en: 'Mountain', fr: 'Montagne', it: 'Montagna', pt: 'Montanha', de: 'Berg' }, category: 'nature', level: 1, example: { en: 'We climbed the mountain yesterday.', es: 'Escalamos la montaña ayer.' } },
  { id: 99, es: 'Bosque', translations: { en: 'Forest', fr: 'Forêt', it: 'Foresta', pt: 'Floresta', de: 'Wald' }, category: 'nature', level: 2, example: { en: 'The forest is full of animals.', es: 'El bosque está lleno de animales.' } },
  { id: 100, es: 'Río', translations: { en: 'River', fr: 'Rivière', it: 'Fiume', pt: 'Rio', de: 'Fluss' }, category: 'nature', level: 1, example: { en: 'The river flows to the sea.', es: 'El río fluye hacia el mar.' } },
  { id: 101, es: 'Amanecer', translations: { en: 'Sunrise', fr: 'Lever du soleil', it: 'Alba', pt: 'Nascer do sol', de: 'Sonnenaufgang' }, category: 'nature', level: 2, example: { en: 'The sunrise was amazing this morning.', es: 'El amanecer fue increíble esta mañana.' } },
  { id: 102, es: 'Tormenta', translations: { en: 'Storm', fr: 'Tempête', it: 'Tempesta', pt: 'Tempestade', de: 'Sturm' }, category: 'nature', level: 2, example: { en: 'There is a big storm coming tonight.', es: 'Viene una gran tormenta esta noche.' } },
  { id: 103, es: 'Terremoto', translations: { en: 'Earthquake', fr: 'Tremblement de terre', it: 'Terremoto', pt: 'Terremoto', de: 'Erdbeben' }, category: 'nature', level: 3, example: { en: 'The earthquake was very strong.', es: 'El terremoto fue muy fuerte.' } },
  { id: 104, es: 'Medio ambiente', translations: { en: 'Environment', fr: 'Environnement', it: 'Ambiente', pt: 'Meio ambiente', de: 'Umwelt' }, category: 'nature', level: 4, example: { en: 'We need to protect the environment.', es: 'Necesitamos proteger el medio ambiente.' } },
  { id: 105, es: 'Calentamiento global', translations: { en: 'Global warming', fr: 'Réchauffement climatique', it: 'Riscaldamento globale', pt: 'Aquecimento global', de: 'Globale Erwärmung' }, category: 'nature', level: 4, example: { en: 'Global warming is a serious problem.', es: 'El calentamiento global es un problema serio.' } },

  // =============================================
  // === FRASES AVANZADAS (Advanced) ===
  // =============================================
  { id: 106, es: 'Me encantaría, pero no puedo', translations: { en: "I'd love to, but I can't", fr: "J'aimerais bien, mais je ne peux pas", it: 'Mi piacerebbe, ma non posso', pt: 'Adoraria, mas não posso', de: 'Ich würde gerne, aber ich kann nicht' }, category: 'greetings', level: 3, example: { en: "I'd love to go to the party, but I can't tonight.", es: 'Me encantaría ir a la fiesta, pero no puedo esta noche.' } },
  { id: 107, es: '¿Podrías hablar más despacio?', translations: { en: 'Could you speak more slowly?', fr: 'Pourriez-vous parler plus lentement?', it: 'Potrebbe parlare più lentamente?', pt: 'Poderia falar mais devagar?', de: 'Könnten Sie langsamer sprechen?' }, category: 'greetings', level: 3, example: { en: "Could you speak more slowly? I'm still learning.", es: '¿Podrías hablar más despacio? Todavía estoy aprendiendo.' } },
  { id: 108, es: '¿Qué significa esa palabra?', translations: { en: 'What does that word mean?', fr: 'Que signifie ce mot?', it: 'Cosa significa quella parola?', pt: 'O que essa palavra significa?', de: 'Was bedeutet dieses Wort?' }, category: 'greetings', level: 2, example: { en: "What does that word mean? I've never heard it before.", es: '¿Qué significa esa palabra? Nunca la había escuchado.' } },
  { id: 109, es: 'No estoy de acuerdo', translations: { en: "I don't agree", fr: "Je ne suis pas d'accord", it: 'Non sono daccordo', pt: 'Não concordo', de: 'Ich stimme nicht zu' }, category: 'work', level: 3, example: { en: "I don't agree with that decision.", es: 'No estoy de acuerdo con esa decisión.' } },
  { id: 110, es: 'En mi opinión', translations: { en: 'In my opinion', fr: 'À mon avis', it: 'Secondo me', pt: 'Na minha opinião', de: 'Meiner Meinung nach' }, category: 'work', level: 3, example: { en: 'In my opinion, we should wait until Monday.', es: 'En mi opinión, deberíamos esperar hasta el lunes.' } },
  { id: 111, es: 'Tengo una cita', translations: { en: 'I have an appointment', fr: "J'ai un rendez-vous", it: 'Ho un appuntamento', pt: 'Tenho uma consulta', de: 'Ich habe einen Termin' }, category: 'health', level: 2, example: { en: 'I have an appointment with the doctor at 3 PM.', es: 'Tengo una cita con el doctor a las 3 PM.' } },
  { id: 112, es: 'Vale la pena', translations: { en: "It's worth it", fr: 'Ça vaut le coup', it: 'Ne vale la pena', pt: 'Vale a pena', de: 'Es lohnt sich' }, category: 'entertainment', level: 3, example: { en: "The museum is expensive, but it's worth it.", es: 'El museo es caro, pero vale la pena.' } },
  { id: 113, es: 'Estoy de acuerdo contigo', translations: { en: 'I agree with you', fr: "Je suis d'accord avec toi", it: 'Sono daccordo con te', pt: 'Concordo com você', de: 'Ich stimme dir zu' }, category: 'work', level: 2, example: { en: 'I agree with you. That is a great idea.', es: 'Estoy de acuerdo contigo. Esa es una gran idea.' } },
  { id: 114, es: 'Mientras tanto', translations: { en: 'In the meantime', fr: 'En attendant', it: 'Nel frattempo', pt: 'Enquanto isso', de: 'In der Zwischenzeit' }, category: 'work', level: 4, example: { en: "The report isn't ready. In the meantime, let's review the data.", es: 'El informe no está listo. Mientras tanto, revisemos los datos.' } },
  { id: 115, es: 'Sin embargo', translations: { en: 'However', fr: 'Cependant', it: 'Tuttavia', pt: 'No entanto', de: 'Jedoch' }, category: 'work', level: 4, example: { en: 'The project is going well. However, we need more time.', es: 'El proyecto va bien. Sin embargo, necesitamos más tiempo.' } },
  { id: 116, es: 'A pesar de', translations: { en: 'Despite', fr: 'Malgré', it: 'Nonostante', pt: 'Apesar de', de: 'Trotz' }, category: 'work', level: 4, example: { en: 'Despite the rain, we had a great time.', es: 'A pesar de la lluvia, la pasamos muy bien.' } },
  { id: 117, es: 'Por lo tanto', translations: { en: 'Therefore', fr: 'Par conséquent', it: 'Pertanto', pt: 'Portanto', de: 'Daher' }, category: 'work', level: 4, example: { en: "The budget is limited. Therefore, we must prioritize.", es: 'El presupuesto es limitado. Por lo tanto, debemos priorizar.' } },
  { id: 118, es: 'Además', translations: { en: 'Furthermore', fr: 'De plus', it: 'Inoltre', pt: 'Além disso', de: 'Außerdem' }, category: 'work', level: 4, example: { en: 'The product is affordable. Furthermore, it has great quality.', es: 'El producto es económico. Además, tiene gran calidad.' } },
]

// Frases del día
export const dailyPhrases = [
  { en: "Practice makes perfect.", es: "La práctica hace al maestro.", category: 'motivation' },
  { en: "Every day is a new opportunity to learn.", es: "Cada día es una nueva oportunidad para aprender.", category: 'motivation' },
  { en: "The early bird catches the worm.", es: "Al que madruga, Dios le ayuda.", category: 'proverb' },
  { en: "Actions speak louder than words.", es: "Las acciones hablan más que las palabras.", category: 'proverb' },
  { en: "Better late than never.", es: "Mejor tarde que nunca.", category: 'proverb' },
  { en: "Where there's a will, there's a way.", es: "Donde hay voluntad, hay un camino.", category: 'motivation' },
  { en: "Knowledge is power.", es: "El conocimiento es poder.", category: 'motivation' },
  { en: "Time is money.", es: "El tiempo es dinero.", category: 'proverb' },
  { en: "Don't judge a book by its cover.", es: "No juzgues un libro por su portada.", category: 'proverb' },
  { en: "The more you practice, the better you get.", es: "Cuanto más practicas, mejor te vuelves.", category: 'motivation' },
  { en: "It's never too late to learn.", es: "Nunca es tarde para aprender.", category: 'motivation' },
  { en: "A journey of a thousand miles begins with a single step.", es: "Un viaje de mil millas comienza con un solo paso.", category: 'motivation' },
  { en: "Believe in yourself.", es: "Cree en ti mismo.", category: 'motivation' },
  { en: "Mistakes are proof that you are trying.", es: "Los errores son prueba de que lo estás intentando.", category: 'motivation' },
  { en: "Learning is a treasure that will follow its owner everywhere.", es: "El aprendizaje es un tesoro que seguirá a su dueño a todas partes.", category: 'motivation' },
  { en: "Rome wasn't built in a day.", es: "Roma no se construyó en un día.", category: 'proverb' },
  { en: "If you can dream it, you can do it.", es: "Si puedes soñarlo, puedes hacerlo.", category: 'motivation' },
  { en: "No pain, no gain.", es: "Sin esfuerzo, no hay recompensa.", category: 'proverb' },
  { en: "Today is a good day to learn something new.", es: "Hoy es un buen día para aprender algo nuevo.", category: 'motivation' },
  { en: "You miss 100% of the shots you don't take.", es: "Pierdes el 100% de los intentos que no haces.", category: 'motivation' },
  { en: "Step by step, you will get there.", es: "Paso a paso, llegarás.", category: 'motivation' },
  { en: "Keep going, you're doing great!", es: "¡Sigue adelante, lo estás haciendo genial!", category: 'motivation' },
  { en: "The best time to start was yesterday. The next best time is now.", es: "El mejor momento para empezar fue ayer. El siguiente mejor momento es ahora.", category: 'motivation' },
  { en: "What goes around, comes around.", es: "Lo que siembras, cosechas.", category: 'proverb' },
  { en: "Every expert was once a beginner.", es: "Todo experto fue alguna vez un principiante.", category: 'motivation' },
  { en: "You are never too old to set a new goal.", es: "Nunca eres demasiado viejo para establecer una nueva meta.", category: 'motivation' },
  { en: "Success is not final, failure is not fatal.", es: "El éxito no es definitivo, el fracaso no es fatal.", category: 'motivation' },
  { en: "The only way to do great work is to love what you do.", es: "La única forma de hacer un gran trabajo es amar lo que haces.", category: 'motivation' },
  { en: "Consistency is the key to success.", es: "La constancia es la clave del éxito.", category: 'motivation' },
  { en: "Never stop learning because life never stops teaching.", es: "Nunca dejes de aprender porque la vida nunca deja de enseñar.", category: 'motivation' },
  { en: "Small progress is still progress.", es: "Un pequeño progreso sigue siendo progreso.", category: 'motivation' },
]

// Textos para lectura por nivel
export const readingTexts = [
  {
    id: 1, level: 1, title: 'My Family', titleEs: 'Mi Familia',
    text: "My name is Maria. I have a big family. I have a mother, a father, two brothers, and one sister. My mother is a teacher. My father is a doctor. We live in a house with a garden. I love my family very much.",
    questions: [
      { question: '¿Cuántos hermanos tiene María?', options: ['Uno', 'Dos', 'Tres', 'Cuatro'], correct: 1 },
      { question: '¿Qué trabaja la madre de María?', options: ['Doctora', 'Profesora', 'Enfermera', 'Abogada'], correct: 1 },
      { question: '¿Dónde viven?', options: ['En un apartamento', 'En una casa con jardín', 'En una granja', 'En la ciudad'], correct: 1 },
    ],
  },
  {
    id: 2, level: 1, title: 'At the Restaurant', titleEs: 'En el Restaurante',
    text: "Today I am at a restaurant. The waiter asks me what I want to eat. I order a pizza and a glass of water. The pizza is delicious. After eating, I ask for the check. The total is fifteen dollars. I leave a tip for the waiter.",
    questions: [
      { question: '¿Qué ordena para comer?', options: ['Hamburguesa', 'Pizza', 'Ensalada', 'Pasta'], correct: 1 },
      { question: '¿Qué bebe?', options: ['Jugo', 'Café', 'Agua', 'Soda'], correct: 2 },
      { question: '¿Cuánto cuesta la cuenta?', options: ['Diez dólares', 'Quince dólares', 'Veinte dólares', 'Cinco dólares'], correct: 1 },
    ],
  },
  {
    id: 3, level: 2, title: 'A Day at Work', titleEs: 'Un Día en el Trabajo',
    text: "I wake up at seven in the morning. I take a shower and eat breakfast. Then I drive to work. I arrive at the office at eight thirty. I have a meeting at nine. After the meeting, I check my emails and work on my computer. I have lunch at twelve. I finish work at five and go home.",
    questions: [
      { question: '¿A qué hora se despierta?', options: ['A las 6', 'A las 7', 'A las 8', 'A las 9'], correct: 1 },
      { question: '¿A qué hora es la reunión?', options: ['A las 8', 'A las 8:30', 'A las 9', 'A las 10'], correct: 2 },
      { question: '¿A qué hora termina de trabajar?', options: ['A las 4', 'A las 5', 'A las 6', 'A las 7'], correct: 1 },
    ],
  },
  {
    id: 4, level: 2, title: 'My Vacation', titleEs: 'Mis Vacaciones',
    text: "Last summer, I went on vacation to the beach with my family. We stayed at a hotel near the ocean. Every morning, we walked on the sand and swam in the sea. In the afternoon, we visited small shops and tried local food. The weather was sunny and hot. It was the best vacation of my life.",
    questions: [
      { question: '¿Adónde fue de vacaciones?', options: ['A la montaña', 'A la playa', 'A la ciudad', 'Al campo'], correct: 1 },
      { question: '¿Dónde se hospedaron?', options: ['En una casa', 'En un camping', 'En un hotel', 'Con amigos'], correct: 2 },
      { question: '¿Cómo estaba el clima?', options: ['Frío y lluvioso', 'Nublado', 'Soleado y caluroso', 'Ventoso'], correct: 2 },
    ],
  },
  {
    id: 5, level: 3, title: 'Job Interview', titleEs: 'Entrevista de Trabajo',
    text: "Yesterday I had a job interview at a technology company. I arrived fifteen minutes early and waited in the lobby. The interviewer asked me about my experience, my skills, and why I wanted to work there. I told her I was passionate about programming and that I had worked on several projects. She seemed impressed and said she would call me next week with a decision. I felt nervous but confident.",
    questions: [
      { question: '¿En qué tipo de empresa fue la entrevista?', options: ['Hospital', 'Restaurante', 'Empresa de tecnología', 'Escuela'], correct: 2 },
      { question: '¿Qué le preguntó la entrevistadora?', options: ['Solo su nombre', 'Su experiencia, habilidades y motivación', 'Su salario anterior', 'Dónde vivía'], correct: 1 },
      { question: '¿Cuándo le darían una respuesta?', options: ['Ese mismo día', 'Al día siguiente', 'La próxima semana', 'En un mes'], correct: 2 },
      { question: '¿Cómo se sintió?', options: ['Enojado', 'Nervioso pero confiado', 'Triste', 'Indiferente'], correct: 1 },
    ],
  },
  {
    id: 6, level: 3, title: 'The Environment', titleEs: 'El Medio Ambiente',
    text: "Climate change is one of the biggest challenges of our time. Every year, temperatures rise and extreme weather events become more frequent. Scientists say we must reduce carbon emissions and use more renewable energy. Simple actions like recycling, using public transport, and saving electricity can make a difference. If we all work together, we can protect our planet for future generations.",
    questions: [
      { question: '¿Cuál es el tema principal del texto?', options: ['La tecnología', 'El cambio climático', 'Los viajes', 'La economía'], correct: 1 },
      { question: '¿Qué dicen los científicos que debemos hacer?', options: ['Usar más petróleo', 'Reducir emisiones de carbono', 'Construir más fábricas', 'Viajar más en avión'], correct: 1 },
      { question: '¿Qué acciones simples menciona el texto?', options: ['Comprar más cosas', 'Reciclar, usar transporte público, ahorrar electricidad', 'Mudarse a otro país', 'No hacer nada'], correct: 1 },
      { question: '¿Para quién debemos proteger el planeta?', options: ['Para los animales solamente', 'Para los políticos', 'Para las futuras generaciones', 'Para los científicos'], correct: 2 },
    ],
  },
]
