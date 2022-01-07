import { render } from "@testing-library/react"
import { MockedProvider } from '@apollo/client/testing';
import Missions from '../Missions';
import { GET_MISSIONS } from "../../../queries/missions.gql";

const mocks = [
    {
        request: {
            query: GET_MISSIONS,
            variables: {
                limit: 3,
            },
        },
        result: {
            "data": {
                "missions": [
                {
                    "id": "9D1B7E0",
                    "name": "Thaicom",
                    "twitter": "https://twitter.com/thaicomplc",
                    "website": "http://www.thaicom.net/en/satellites/overview",
                    "wikipedia": "https://en.wikipedia.org/wiki/Thaicom"
                },
                {
                    "id": "F4F83DE",
                    "name": "Telstar",
                    "twitter": null,
                    "website": "https://www.telesat.com/",
                    "wikipedia": "https://en.wikipedia.org/wiki/Telesat"
                },
                {
                    "id": "F3364BF",
                    "name": "Iridium NEXT",
                    "twitter": "https://twitter.com/IridiumBoss?lang=en",
                    "website": "https://www.iridiumnext.com/",
                    "wikipedia": "https://en.wikipedia.org/wiki/Iridium_satellite_constellation"
                }
                ]
            }
        }
    },
];

describe('Missions component', () => {
    it('Should display name of each mission', async () => {
        const { findByText } = render(
            <MockedProvider mocks={mocks}>
                <Missions/>
            </MockedProvider>
        );

        await findByText('Thaicom');
        await findByText('Telstar');
        await findByText('Iridium NEXT');
    });

    it ('Should display links for the mission', async () => {
        const localMocks = [
            {
                ...mocks[0],
                result: {
                    data: {
                        missions: [
                            {
                                "id": "F4F83DE",
                                "name": "Telstar",
                                "links": ['https://www.telesat.com/']
                            },
                        ]
                    }
                }
            }
        ];

        const { findByRole } = render(
            <MockedProvider mocks={localMocks}>
                <Missions/>
            </MockedProvider>
        );

        await findByRole('link',{
            name: /https:\/\/www\.telesat\.com\//i
        })
    });
})