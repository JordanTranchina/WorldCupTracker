export type Position = 'GK' | 'DEF' | 'MID' | 'FWD';

export interface Player {
  name: string;
  position: Position;
  club: string;
  number: number;
}

export interface Squad {
  team: string;
  code: string;
  flag: string;
  players: Player[];
}

export const SQUADS: Record<string, Squad> = {
  usa: {
    team: 'USA',
    code: 'usa',
    flag: '🇺🇸',
    players: [
      { number: 1, name: 'Matt Turner', position: 'GK', club: 'New England Revolution' },
      { number: 12, name: 'Chris Brady', position: 'GK', club: 'Chicago Fire' },
      { number: 23, name: 'Matt Freese', position: 'GK', club: 'New York City FC' },
      { number: 2, name: 'Sergino Dest', position: 'DEF', club: 'PSV' },
      { number: 3, name: 'Antonee Robinson', position: 'DEF', club: 'Fulham' },
      { number: 4, name: 'Miles Robinson', position: 'DEF', club: 'FC Cincinnati' },
      { number: 5, name: 'Tim Ream', position: 'DEF', club: 'Charlotte FC' },
      { number: 6, name: 'Chris Richards', position: 'DEF', club: 'Crystal Palace' },
      { number: 15, name: 'Mark McKenzie', position: 'DEF', club: 'Toulouse' },
      { number: 16, name: 'Joe Scally', position: 'DEF', club: 'Borussia Mönchengladbach' },
      { number: 19, name: 'Auston Trusty', position: 'DEF', club: 'Celtic' },
      { number: 20, name: 'Max Arfsten', position: 'DEF', club: 'Columbus Crew' },
      { number: 21, name: 'Alex Freeman', position: 'DEF', club: 'Villarreal' },
      { number: 7, name: 'Weston McKennie', position: 'MID', club: 'Juventus' },
      { number: 8, name: 'Tyler Adams', position: 'MID', club: 'Bournemouth' },
      { number: 10, name: 'Gio Reyna', position: 'MID', club: 'Borussia Mönchengladbach' },
      { number: 14, name: 'Malik Tillman', position: 'MID', club: 'Bayer Leverkusen' },
      { number: 17, name: 'Cristian Roldan', position: 'MID', club: 'Seattle Sounders' },
      { number: 22, name: 'Sebastian Berhalter', position: 'MID', club: 'Vancouver Whitecaps' },
      { number: 11, name: 'Brenden Aaronson', position: 'FWD', club: 'Leeds United' },
      { number: 9, name: 'Folarin Balogun', position: 'FWD', club: 'Monaco' },
      { number: 13, name: 'Ricardo Pepi', position: 'FWD', club: 'PSV' },
      { number: 18, name: 'Tim Weah', position: 'FWD', club: 'Marseille' },
      { number: 24, name: 'Haji Wright', position: 'FWD', club: 'Coventry City' },
      { number: 25, name: 'Alejandro Zendejas', position: 'FWD', club: 'Club América' },
      { number: 26, name: 'Christian Pulisic', position: 'FWD', club: 'AC Milan' },
    ],
  },
  eng: {
    team: 'England',
    code: 'eng',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    players: [
      { number: 1, name: 'Jordan Pickford', position: 'GK', club: 'Everton' },
      { number: 12, name: 'Dean Henderson', position: 'GK', club: 'Crystal Palace' },
      { number: 23, name: 'James Trafford', position: 'GK', club: 'Manchester City' },
      { number: 2, name: 'Reece James', position: 'DEF', club: 'Chelsea' },
      { number: 3, name: 'Dan Burn', position: 'DEF', club: 'Newcastle United' },
      { number: 4, name: 'John Stones', position: 'DEF', club: 'Manchester City' },
      { number: 5, name: 'Marc Guéhi', position: 'DEF', club: 'Manchester City' },
      { number: 6, name: 'Ezri Konsa', position: 'DEF', club: 'Aston Villa' },
      { number: 13, name: 'Jarell Quansah', position: 'DEF', club: 'Bayer Leverkusen' },
      { number: 16, name: 'Djed Spence', position: 'DEF', club: 'Tottenham' },
      { number: 17, name: 'Nico O\'Reilly', position: 'DEF', club: 'Manchester City' },
      { number: 22, name: 'Tino Livramento', position: 'DEF', club: 'Newcastle United' },
      { number: 7, name: 'Jude Bellingham', position: 'MID', club: 'Real Madrid' },
      { number: 8, name: 'Declan Rice', position: 'MID', club: 'Arsenal' },
      { number: 10, name: 'Eberechi Eze', position: 'MID', club: 'Arsenal' },
      { number: 14, name: 'Kobbie Mainoo', position: 'MID', club: 'Manchester United' },
      { number: 15, name: 'Elliot Anderson', position: 'MID', club: 'Nottingham Forest' },
      { number: 19, name: 'Jordan Henderson', position: 'MID', club: 'Brentford' },
      { number: 20, name: 'Morgan Rogers', position: 'MID', club: 'Aston Villa' },
      { number: 9, name: 'Harry Kane', position: 'FWD', club: 'Bayern Munich' },
      { number: 11, name: 'Bukayo Saka', position: 'FWD', club: 'Arsenal' },
      { number: 18, name: 'Marcus Rashford', position: 'FWD', club: 'Barcelona' },
      { number: 21, name: 'Ollie Watkins', position: 'FWD', club: 'Aston Villa' },
      { number: 24, name: 'Ivan Toney', position: 'FWD', club: 'Al Ahli' },
      { number: 25, name: 'Anthony Gordon', position: 'FWD', club: 'Barcelona' },
      { number: 26, name: 'Noni Madueke', position: 'FWD', club: 'Arsenal' },
    ],
  },
  esp: {
    team: 'Spain',
    code: 'esp',
    flag: '🇪🇸',
    players: [
      { number: 1, name: 'Unai Simón', position: 'GK', club: 'Athletic Club' },
      { number: 12, name: 'David Raya', position: 'GK', club: 'Arsenal' },
      { number: 23, name: 'Joan García', position: 'GK', club: 'Barcelona' },
      { number: 2, name: 'Pedro Porro', position: 'DEF', club: 'Tottenham' },
      { number: 3, name: 'Alejandro Grimaldo', position: 'DEF', club: 'Bayer Leverkusen' },
      { number: 4, name: 'Pau Cubarsí', position: 'DEF', club: 'Barcelona' },
      { number: 5, name: 'Aymeric Laporte', position: 'DEF', club: 'Athletic Club' },
      { number: 6, name: 'Marcos Llorente', position: 'DEF', club: 'Atlético Madrid' },
      { number: 16, name: 'Eric García', position: 'DEF', club: 'Barcelona' },
      { number: 19, name: 'Marc Cucurella', position: 'DEF', club: 'Chelsea' },
      { number: 24, name: 'Marc Pubill', position: 'DEF', club: 'Atlético Madrid' },
      { number: 7, name: 'Pedri', position: 'MID', club: 'Barcelona' },
      { number: 8, name: 'Fabian Ruiz', position: 'MID', club: 'PSG' },
      { number: 9, name: 'Gavi', position: 'MID', club: 'Barcelona' },
      { number: 14, name: 'Rodri', position: 'MID', club: 'Manchester City' },
      { number: 15, name: 'Mikel Merino', position: 'MID', club: 'Arsenal' },
      { number: 20, name: 'Martin Zubimendi', position: 'MID', club: 'Arsenal' },
      { number: 22, name: 'Alex Baena', position: 'MID', club: 'Atlético Madrid' },
      { number: 10, name: 'Dani Olmo', position: 'FWD', club: 'Barcelona' },
      { number: 11, name: 'Ferran Torres', position: 'FWD', club: 'Barcelona' },
      { number: 13, name: 'Mikel Oyarzabal', position: 'FWD', club: 'Real Sociedad' },
      { number: 17, name: 'Nico Williams', position: 'FWD', club: 'Athletic Club' },
      { number: 18, name: 'Lamine Yamal', position: 'FWD', club: 'Barcelona' },
      { number: 21, name: 'Borja Iglesias', position: 'FWD', club: 'Celta Vigo' },
      { number: 25, name: 'Yeremy Pino', position: 'FWD', club: 'Crystal Palace' },
      { number: 26, name: 'Víctor Muñoz', position: 'FWD', club: 'Osasuna' },
    ],
  },
  bra: {
    team: 'Brazil',
    code: 'bra',
    flag: '🇧🇷',
    players: [
      { number: 1, name: 'Alisson', position: 'GK', club: 'Liverpool' },
      { number: 12, name: 'Ederson', position: 'GK', club: 'Fenerbahçe' },
      { number: 23, name: 'Weverton', position: 'GK', club: 'Grêmio' },
      { number: 2, name: 'Danilo', position: 'DEF', club: 'Flamengo' },
      { number: 3, name: 'Alex Sandro', position: 'DEF', club: 'Flamengo' },
      { number: 4, name: 'Marquinhos', position: 'DEF', club: 'PSG' },
      { number: 5, name: 'Gabriel', position: 'DEF', club: 'Arsenal' },
      { number: 6, name: 'Bremer', position: 'DEF', club: 'Juventus' },
      { number: 13, name: 'Léo Pereira', position: 'DEF', club: 'Flamengo' },
      { number: 14, name: 'Ibañez', position: 'DEF', club: 'Al Ahli' },
      { number: 22, name: 'Douglas Santos', position: 'DEF', club: 'Zenit' },
      { number: 7, name: 'Lucas Paquetá', position: 'MID', club: 'Flamengo' },
      { number: 8, name: 'Casemiro', position: 'MID', club: 'Manchester United' },
      { number: 15, name: 'Fabinho', position: 'MID', club: 'Al Ittihad' },
      { number: 16, name: 'Bruno Guimarães', position: 'MID', club: 'Newcastle United' },
      { number: 17, name: 'Danilo', position: 'MID', club: 'Botafogo' },
      { number: 21, name: 'Ederson', position: 'MID', club: 'Atalanta' },
      { number: 9, name: 'Neymar', position: 'FWD', club: 'Santos' },
      { number: 10, name: 'Vinicius Jr.', position: 'FWD', club: 'Real Madrid' },
      { number: 11, name: 'Raphinha', position: 'FWD', club: 'Barcelona' },
      { number: 18, name: 'Gabriel Martinelli', position: 'FWD', club: 'Arsenal' },
      { number: 19, name: 'Luiz Henrique', position: 'FWD', club: 'Zenit' },
      { number: 20, name: 'Matheus Cunha', position: 'FWD', club: 'Manchester United' },
      { number: 24, name: 'Endrick', position: 'FWD', club: 'Real Madrid' },
      { number: 25, name: 'Igor Thiago', position: 'FWD', club: 'Brentford' },
      { number: 26, name: 'Rayan', position: 'FWD', club: 'Bournemouth' },
    ],
  },
};

export function getSquad(code: string): Squad | undefined {
  return SQUADS[code];
}
