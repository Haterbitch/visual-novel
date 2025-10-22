/** @file simple-story.js
 *  A simple, short example story to demonstrate the visual novel engine
 */

import {
    CharacterPosition,
    CharacterPose,
    background,
    showCharacter,
    hideCharacter,
    dialogue,
    narration,
    setVariable,
    jumpTo,
    conditionalJump,
    endStory,
    choice,
} from '../engine/story-format.js';

/** @type {import('../engine/story-format.js').Story} */
export const story = {
    start: 'Start',
    variables: {
        tookUmbrella: false,
        friendlyPoints: 0,
    },

    nodes: {
        Start: [
            background('bedroom'),
            showCharacter('you', CharacterPose.neutral, CharacterPosition.center),
            narration('Du står ude foran slottet.'),
            narration('Det er spooky, men også spændende. '),
            hideCharacter('you'),

            choice(
                'Går du ind på slottet?',
                [
                    'Fuck JA! Elsker SPOOKY!',
                    'indpaaslottet',
                ],
                [
                    'NEJ! GET MED THE FUCK OUT OF HERE!!',
                    'nejtak',
                ],
            ),
        ],

        indpaaslottet: [
            narration('Du går nu ind på Spooky Slottet. '),
            setVariable('indpaaslottet', true),
            jumpTo('Eat'),
        ],

        nejtak: [
            narration('Slottet er hjemsøgt og hiver dig ind om du vil eller ej!!'),
            setVariable('nejtak', false),
            jumpTo('Eat'),
        ],

        Eat: [
            background('eat'),
            showCharacter('bob', CharacterPose.happy, CharacterPosition.right),
            dialogue('bob', 'UHHHHHH!!! Bøh'),
            showCharacter('you', CharacterPose.neutral, CharacterPosition.left),

            choice(
                'Hvordan reagere du, på den anden person?',
                [
                    'HEJ! skal vi være venner??',
                    'Confident',
                ],
                [
                    'ARRRRRGH!!! er du et spøgelse?',
                    'Nervous',
                ],
            ),
        ],

        Confident: [
            showCharacter('you', CharacterPose.happy, CharacterPosition.left),
            dialogue('you', 'NIIICE! Du virker sej!'),
            showCharacter('bob', CharacterPose.happy, CharacterPosition.right),
            dialogue('bob', 'Jeg Er super sej!'),
            setVariable('friendlyPoints', state => state.variables.friendlyPoints + 1),
            jumpTo('Lunch'),
        ],

        Nervous: [
            showCharacter('you', CharacterPose.sad, CharacterPosition.left),
            dialogue('you', 'HJÆLP HJÆLP DU ER ET SPØGELSE!!'),
            showCharacter('bob', CharacterPose.neutral, CharacterPosition.right),
            dialogue('bob', 'NEJ NEJ! rolig nu... Jeg hedder BOB '),
            jumpTo('Lunch'),
        ],

        Lunch: [
            hideCharacter('you'),
            hideCharacter('bob'),
            narration('Du skal se mere af slottet!'),
            showCharacter('bob', CharacterPose.neutral, CharacterPosition.center),
            dialogue('bob', 'Jeg bor her på slottet!'),
            hideCharacter('bob'),
            jumpTo('indpaaslottet'),
        ],

        indpaaslottet: [
            showCharacter('you', CharacterPose.happy, CharacterPosition.center),
            narration('Vildt, du bor her, jeg vil se mere!'),
            showCharacter('bob', CharacterPose.sad, CharacterPosition.right),
            dialogue('bob', 'Fedt! Kom med.'),
            hideCharacter('you'),

            choice(
                'Vil du se BoBs værelse?',
                [
                    'Ja! mere spooky shit!',
                    'PinkSleep',
                ],
                [
                    'KUN hvis det ikke er spooky!',
                    'SpookySleep',
                ],
            ),
        ],

        SpookySleep: [
            background('spookysleep'),
            showCharacter('you', CharacterPose.sad, CharacterPosition.center),
            showCharacter('bob', CharacterPose.happy, CharacterPosition.right),
            narration('Jeg sagde det ikke måtte være spooky!! '),
            showCharacter('bob', CharacterPose.happy, CharacterPosition.right),
            dialogue('bob', 'Det er ikke spooky, det er cosy!'),
            hideCharacter('you'),
            showCharacter('you', CharacterPose.sad, CharacterPosition.left),
            showCharacter('bob', CharacterPose.sad, CharacterPosition.right),
            dialogue('bob', 'Vil du så ikke være venner?'),
            dialogue('you', 'nej!'),
            setVariable('friendlyPoints', state => state.variables.friendlyPoints + 1),
            jumpTo('EndingAlone'),
        ],

        PinkSleep: [
            background('pinksleep'),
            showCharacter('you', CharacterPose.sad, CharacterPosition.left),
            showCharacter('bob', CharacterPose.happy, CharacterPosition.right),
            dialogue('bob', 'Jeg har lidt feminin smag!'),
            showCharacter('bob', CharacterPose.happy, CharacterPosition.right),
            dialogue('you', 'Det skulle være spooky! ØV jeg vil have Spooky shit! '),
            showCharacter('bob', CharacterPose.sad, CharacterPosition.right),
            dialogue('bob', 'Vil du så ikke være venner?'),
            dialogue('you', 'nej!'),
            setVariable('friendlyPoints', state => state.variables.friendlyPoints + 2),
            jumpTo('EndingAlone'),
        ],

        EndingAlone: [
            narration('Du går fra BoB!'),
            narration('Du ser aldrig BoB igen. '),
            narration('Senere høre du på tv2 News at BoB er fundet død på slottet.'),
            narration('Slottet er nu lavet til ældre boliger.'),
            endStory(),
        ],
    },

    characters: {
        you: {
            name: 'You',
            poses: {
                [CharacterPose.neutral.name]: 'assets/characters/alice/neutral.png',
                [CharacterPose.happy.name]: 'assets/characters/alice/happy.png',
                [CharacterPose.sad.name]: 'assets/characters/alice/sad.png',
            },
        },
        bob: {
            name: 'Bob',
            poses: {
                [CharacterPose.neutral.name]: 'assets/characters/bob/neutral.png',
                [CharacterPose.happy.name]: 'assets/characters/bob/happy.png',
                [CharacterPose.sad.name]: 'assets/characters/bob/sad.png',
            },
        },
    },

    places: {
        bedroom: 'assets/backgrounds/slot.png',
        eat: 'assets/backgrounds/spisestue.png',
        spookysleep: 'assets/backgrounds/soveværelse.png',
        pinksleep: 'assets/backgrounds/sove girly.png',
    },
};
