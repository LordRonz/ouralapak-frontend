const Snippet = () => (
  <pre className='max-w-full overflow-x-auto rounded border bg-gray-100 px-4 py-1 font-mono text-sm text-black'>
    {`[
  {
    section : 'Applications',
    content: [
      {
        title: 'Users',
        icon: <UsersIcon />,
        link: '/admin/users'
      },
      {
        title: 'Medias',
        icon: <MediasIcon/>,
        link: '/admin/medias'
      },
    ]
  },
]
`}
  </pre>
);

export default Snippet;
