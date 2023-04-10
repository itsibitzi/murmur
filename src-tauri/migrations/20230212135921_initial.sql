CREATE TABLE files (
    id   TEXT PRIMARY KEY NOT NULL, -- Hash of the file
    name TEXT NOT NULL,
    data BLOB NOT NULL
) WITHOUT ROWID;

CREATE TABLE file_jobs (
    id         INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    file_id    TEXT NOT NULL,
    language   TEXT NOT NULL,
    created_at TEXT NOT NULL, -- ISO formatted date
    quality    TEXT CHECK(quality IN ('low', 'medium', 'high')) NOT NULL,
    status     BOOL CHECK(status IN ('waiting', 'in-progress', 'done', 'error')) NOT NULL,

    UNIQUE (file_id, quality),
    FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE CASCADE
);

CREATE TABLE speakers (
    id   TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL
);

INSERT INTO speakers (id, name) VALUES ('default_speaker', 'Unknown Speaker');

CREATE TABLE speaker_spans (
    speaker_id           TEXT NOT NULL,
    file_id              TEXT NOT NULL,
    job_id               INTEGER NOT NULL,
    start_segment_number INT NOT NULL,
    PRIMARY KEY (job_id, start_segment_number),
    FOREIGN KEY (speaker_id) REFERENCES speakers(id) ON DELETE CASCADE
    FOREIGN KEY (job_id) REFERENCES file_jobs(id) ON DELETE CASCADE
    FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE CASCADE
);

CREATE TABLE segments (
    file_id    TEXT NOT NULL,
    job_id     INTEGER NOT NULL,
    number     INT NOT NULL,
    start      INT NOT NULL,
    end        INT NOT NULL,
    text       TEXT NOT NULL,
    PRIMARY KEY (job_id, number),
    FOREIGN KEY (job_id) REFERENCES file_jobs(id) ON DELETE CASCADE
    FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE CASCADE
) WITHOUT ROWID;
